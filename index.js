const addCard = document.querySelector('#addCard')
const displayImage = document.querySelector('#displayImage')
const loadingCard = document.querySelector('#loadingCard')
const downloadCard = document.querySelector('#downloadCard')
const fileInput = document.querySelector('.file-input')
const imageBefore = document.querySelector('#displayImage img')
const startBtn = document.querySelector('.start')
const imageRemovedBG = document.querySelector('.imageRemovedBG')
const downloadBtn = document.querySelector('.download a')
const uploadAnother = document.querySelector('.uploadAnother')

const formData = new FormData()
let reader = new FileReader()
const API_URL = 'https://api.hotpot.ai/colorize-picture'
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjExNTk5MDgsImV4cCI6MTcyMTE2NzEwOH0.UUAiZnJP_Cu7cz-APeYTrf8JxO9dxtfFn2A4lq4lcEk'
const AUTH_TOKEN = 'hotpot-t2mJbCr8292aQzp8CnEPaK'
const REQ_ID = 'ru2I8VoLBnVUH2P'
let file

const myHeaders = new Headers();
myHeaders.append('Api-Token', API_TOKEN);
myHeaders.append('Authorization', AUTH_TOKEN);

displayScrean(addCard)

function displayScrean(screan) {
    addCard.style.display = 'none'
    displayImage.style.display = 'none'
    loadingCard.style.display = 'none'
    downloadCard.style.display = 'none'
    screan.style.display = 'flex'
}

fileInput.addEventListener('input', () => {
    file = fileInput.files[0]
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
        imageBefore.src = reader.result
    })
    displayScrean(displayImage)
})


const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow"
};

startBtn.addEventListener('click', () => {
    formData.append('image', file)
    formData.append('requestId', REQ_ID)
    displayScrean(loadingCard)
    fetch(API_URL, requestOptions)
        .then(res => res.blob())
        .then(data => {
            reader.readAsDataURL(data)
            reader.addEventListener('load', () => {
                imageRemovedBG.src = reader.result
                downloadBtn.href = reader.result
            })
            displayScrean(downloadCard)
        })
})

uploadAnother.addEventListener('click', () => {
    window.location.reload()
})