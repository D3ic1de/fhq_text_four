// 获取5个导航点
const dots = Array.from(document.querySelectorAll(".dot a"))
const imgArr = Array.from(document.querySelectorAll(".img-list li"))


document.addEventListener("click", (event) => {
    const index = dots.indexOf(event.target)
    if(index != -1){
        changeImg(index)
    }
})

//自动切换图片
const toggleChange = (function (){
    let timer = null
    return () => {
        //判断timer是否为null
        if(timer === null){
            timer = setTimeout(function auto(){
                changeImg("next")
                timer = setTimeout(auto, 2500)
            },2500)
        }else{
            clearTimeout(timer)
            timer = null
        }
    }
})()

toggleChange()

//获取banner
const banner = document.getElementsByClassName("banner")[0]
banner.onmouseenter = () => {
    toggleChange()
}
banner.onmouseleave = () => {
    toggleChange()
}
// 点击按钮切换图片
const prev = document.getElementById("prev")
const next = document.getElementById("next")

prev.onclick = () => {
    changeImg("prev")
}

next.onclick = () => {
    changeImg("next")
}

function changeImg(dir){
    //获取当前显示的图片
    const current = document.querySelector(".img-list .current")

    //获取下一个图片
    let next
    if(dir === "next"){
        next = current.nextElementSibling || imgArr[0]
    }else if(dir === "prev"){
        next = current.previousElementSibling || imgArr.at(-1)
    }else if(typeof(dir) === "number"){
        next = imgArr[dir]
    }

    //获取当前要显示的图片的索引
    const index = imgArr.indexOf(next)

    //切换显示状态
    current.classList.remove("current")
    next.classList.add("current")

    //切换active
    const currentActive = document.querySelector(".active")
    currentActive.classList.remove("active")
    
    //获取当前要显示的点
    dots[index].classList.add("active")
}