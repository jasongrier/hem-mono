function copyToClipboard() {
  var copyText = document.getElementById('clipboard-content')
  var copyMessage = document.getElementById('clipboard-message')

  copyText.select()
  copyText.setSelectionRange(0, 99999)
  document.execCommand('copy')
  copyMessage.innerHTML = 'Copied!'
  // alert("Copied the text: " + copyText.value)
}
