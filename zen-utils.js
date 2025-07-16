let originalFPS = 12
let targetFPS = 24
let multi = targetFPS / originalFPS

function parseTrack(track) {
  let name = track.querySelector('name').textContent

  let previousFrame = {
    x: 0, y: 0,
    sx: 1, sy: 1,
    kx: 0, ky: 0,
    vis: true, i: null
  }
  let t = Array.from(track.getElementsByTagName('t'))

  let frames = t.map(frame => {
    let iTag = frame.querySelector('i')
    let xTag = frame.querySelector('x')
    let yTag = frame.querySelector('y')
    let sxTag = frame.querySelector('sx')
    let syTag = frame.querySelector('sy')
    let kxTag = frame.querySelector('kx')
    let kyTag = frame.querySelector('ky')
    let fTag = frame.querySelector('f')

    let newData = { ...previousFrame }

    if (iTag) newData.i = iTag.textContent.slice(13)
    if (xTag) newData.x = parseFloat(xTag.textContent)
    if (yTag) newData.y = parseFloat(yTag.textContent)
    if (sxTag) newData.sx = parseFloat(sxTag.textContent)
    if (syTag) newData.sy = parseFloat(syTag.textContent)
    if (kxTag) newData.kx = parseFloat(kxTag.textContent) * Math.PI/180
    if (kyTag) newData.ky = parseFloat(kyTag.textContent) * Math.PI/180
    if (fTag) newData.vis = parseInt(fTag.textContent) === 0

    previousFrame = newData
    return newData
  })

  return {
    name,
    frames,
    hasImage: !!previousFrame.i
  }
}

function interpolate(a, b, x) {
  return a + (b - a) * x
}

function round(n, dp) {
  let pow = Math.pow(10, dp)
  return Math.round(n * pow) / pow
}

let animationInterval = {}
function setupPlant(plant, track, selector) {
  let characterDiv = document.querySelector(selector)
  let selected = plant + '.reanim'
  let baseID = selector.replace(/[^\w]/g, '-')

  characterDiv.classList.add(`${plant}-${track}`)

  $.ajax({
    url: `/res/${selected}`
  }, (err, status, body) => {
    let domParser = new DOMParser()
    let xmlDocument = domParser.parseFromString(`<anim>${body}</anim>`, 'application/xml')

    let anim = xmlDocument.getElementsByTagName('anim')[0]
    let tracks = Array.from(anim.getElementsByTagName('track')).map(parseTrack)
    let controlTracks = tracks.map(track => track.name).filter(name => name.startsWith('anim_'))
    if (!track) document.getElementById('track').innerHTML = controlTracks.map(plant => `<option>${plant}</option>`)

    let controlTrackName = track || controlTracks.find(track => track.includes('full_idle'))
      || controlTracks.find(track => track.includes('idle')) || 'anim_idle'
    
    let controlTrack = tracks.find(track => track.name === controlTrackName)

    let startIndex = controlTrack.frames.findIndex(frame => frame.vis)
    let endIndex = controlTrack.frames.findLastIndex(frame => frame.vis)

    let bodyPartIdleTracks = tracks.filter(track => {
      return (controlTrackName.includes('blink') ? true : !track.name.includes('blink')) && track.hasImage
    }).map(track => {
      let frames = track.frames.slice(startIndex, endIndex + 1)

      return {
        name: track.name,
        frames,
        hasImage: frames[0] && frames.some(frame => frame.i)
      }
    }).filter(track => track.hasImage && track.frames.some(frame => frame.vis))

    bodyPartIdleTracks.forEach(track => {
      let imgTag = document.createElement('img')
      imgTag.id = baseID + track.name

      imgTag.style.position = 'absolute'
      imgTag.style.transformOrigin = 'top left'

      characterDiv.appendChild(imgTag)
    })

    let frameN = 0
    clearInterval(animationInterval[selector] || -1)

    let baked = bodyPartIdleTracks.map(track => {
      track.frames = track.frames.map((frame, i) => {
        if (i === 0) return [frame]
        let prev = track.frames[i - 1]

        let size = 1 / multi, count = multi - 1
        let nValues = []
        for (let n = 1; n <= count; n++) nValues.push(n * size)

        let framesInbetween = nValues.map(n => {
          let mX = interpolate(prev.x, frame.x, n)
          let mY = interpolate(prev.y, frame.y, n)
          let mSX = interpolate(prev.sx, frame.sx, n)
          let mSY = interpolate(prev.sy, frame.sy, n)
          let mKX = interpolate(prev.kx, frame.kx, n)
          let mKY = interpolate(prev.ky, frame.ky, n)
          return {
            i: prev.i,
            x: mX, y: mY,
            sx: mSX, sy: mSY,
            kx: mKX, ky: mKY,
            vis: prev.vis
          }
        })
  
        return [...framesInbetween, frame]
      }).reduce((a, e) => a.concat(e), []).map(frame => {
        let vis = frame.i && frame.vis
        let { x, y, sx, sy, kx, ky } = frame

        let a = round(sx * Math.cos(kx), 2)
        let b = round(sx * Math.sin(kx), 2)
        let c = round(-sy * Math.sin(ky), 2)
        let d = round(sy * Math.cos(ky), 2)

        let transform = `matrix(${a}, ${b}, ${c}, ${d}, ${x}, ${y})`
        return {
          vis,
          img: frame.i,
          transform
        }
      })

      return track
    })

    animationInterval[selector] = setInterval(() => {
      baked.forEach(track => {
        let imgTag = document.getElementById(baseID + track.name)
        let frame = track.frames[frameN]

        imgTag.style.display = frame.vis ? 'inline' : 'none'
        imgTag.style.transform = frame.transform
        if (frame.vis) imgTag.src = `/res_used/${frame.img}.PNG`
      })

      frameN++
      if (frameN === baked[0].frames.length) frameN = 0
    }, 1000 / targetFPS)
  })
}