const img_con = document.querySelector(".img")
const name_con = document.querySelector(".name")
const previousBtn= document.querySelector(".previousBtn")
const pauseBtn = document.querySelector(".pauseBtn")
const nextBtn = document.querySelector(".nextBtn")
const timing= document.querySelector(".timing")
const done= document.querySelector(".done")
const duration= document.querySelector(".duration")
const img = document.querySelector("img")
const singer_con = document.querySelector(".singer")

let songList = [
    { 
        image: "../img/one.jfif",
        name : "One",
        singer: "Metallica",
        songs : "./music/one.mp3",
        duration_time : 447
    },
    { 
        image: "../img/dream.jfif",
        name : "Dream On",
        singer: "Aerosmith",
        songs :"./music/dream.mp3",
        duration_time : 268
    },
    { 
        image: "../img/rain.jfif",
        name : "November Rain",
        singer: "Guns N Roses",
        songs : "./music/rain.mp3",
        duration_time : 539
    }
]
let isPlaying = false
let idx = 1;
let currentTime = 0;

let myInt;
let witdhInt;
let goesPer;
let willGo ;
let ts = 0 
let tm = 0

pauseBtn.addEventListener("click" , action)
const audio = document.createElement("audio")

displayer(idx)

function displayer(idx){
    audio.src = songList[idx].songs
    img.src = songList[idx].image
    name_con.innerHTML = songList[idx].name
    duration.innerHTML = songList[idx].duration_time
    singer_con.innerHTML = songList[idx].singer
    timing.innerHTML = `00:00`
    goesPer =  songList[idx].duration_time * 10
}


function action(){
    if(isPlaying === false){
        audio.play()
        isPlaying = true
        console.log("play")
        pauseBtn.innerHTML = `<i class="fa-solid fa-pause">`
        myInt = setInterval(timeInterval ,1000)
        witdhInt = setInterval(witdhInterval , goesPer)
    }else if(isPlaying === true){
        audio.pause()
        isPlaying = false
        console.log("pause")
        pauseBtn.innerHTML = `<i class="fa-solid fa-play">`
        clearInterval(myInt)
        clearInterval(witdhInt)
        done.style.width = `0%`
    } 
}

switchSong()

function switchSong(){
    previousBtn.addEventListener("click" , ()=>{
    if(idx === 1 || idx === 2){
        pauseBtn.innerHTML = `<i class="fa-solid fa-play">`
        audio.pause()
        idx--
        console.log(idx)
        displayer(idx)
        percentage(idx)
        clearInterval(myInt)
        clearInterval(witdhInt)
        done.style.width = `0%`
        ts = 0
        }
    })

    nextBtn.addEventListener("click" , ()=>{
    if(idx === 0 || idx === 1){
            pauseBtn.innerHTML = `<i class="fa-solid fa-play">`
            audio.pause()
            idx++
            console.log(idx)
            displayer(idx)
            percentage(idx)
            clearInterval(myInt)
            clearInterval(witdhInt)
            done.style.width = `0%`
            ts = 0
        }
    })
}

function timeInterval(){
    ts++
    if(ts>59){
        tm++
        ts = 0
    }
    timing.innerHTML = `${tm}:${ts}`
    if(ts < 10){
        timing.innerHTML = `${tm}:0${ts}`
    }
    
}
let witdhProcess = 0;
function witdhInterval(){
 
    witdhProcess++
    done.style.width = `${witdhProcess}%`

    
    console.log(witdhProcess)
    console.log(goesPer)
}

percentage(idx)
function percentage(idx){
    let timer = songList[idx].duration_time;
    let fs = timer % 60;
    let fm =  parseInt(timer / 60)
    duration.innerHTML = `${fm}:${fs}`
}

