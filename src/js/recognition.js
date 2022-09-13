const controllers = {
    container: document.querySelector('[data-js="controllers"]'),
    buttons: {
        start: document.querySelector('[data-js="start"]'),
        stop: document.querySelector('[data-js="stop"]'),
        clear: document.querySelector('[data-js="clear"]'),
        download: document.querySelector('[data-js="download"]')
    }
}
const textarea = document.querySelector('[data-js="speech-textarea"]')

const SpeechToText = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    speechAPI = new SpeechRecognition()

    speechAPI.continuous = true
    speechAPI.lang = 'pt-BR'
    speechAPI.onresult = e => { 
        textarea.value += e.results[e.resultIndex][0].transcript
    }
    return speechAPI
}

const downloadTextFile = (text, filename) => {
    link = document.createElement('a')
    link.setAttribute('href','data:text/plaincharset=utf-8,' + encodeURIComponent(text))
    link.setAttribute('download', filename)
    link.style.display = 'none'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const setControllersVisible = element => {
    buttons = controllers.container.querySelectorAll('button')
    Array.from(buttons).map(button => button.classList.add('d-none'))
    element.classList.remove('d-none')
}

const recognitionSpeech = SpeechToText()

controllers.buttons.start.addEventListener('click', () => {
    setControllersVisible(controllers.buttons.stop)
    recognitionSpeech.start()
})

controllers.buttons.stop.addEventListener('click', () => {
    setControllersVisible(controllers.buttons.start)
    recognitionSpeech.stop()
})

controllers.buttons.clear.addEventListener('click', () => {
    textarea.value = ""

    toastError = document.querySelector('#toastClear')
    toast = new bootstrap.Toast(toastError)
    toast.show()
})

controllers.buttons.download.addEventListener('click', () => {
    if(textarea.value) {        
        text = textarea.value
        downloadTextFile(text, "speechWEB.text")
    }
    else {
        toastError = document.querySelector('#toastErrorDownload')
        toast = new bootstrap.Toast(toastError)
        toast.show()
    }
})
