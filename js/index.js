function downloadApk() {
    const apiUrl = 'https://firebasestorage.googleapis.com/v0/b/space-73.appspot.com/o/files%2Flzl3FD5FXIRiKLUKSMmcICXKSTk2%2FNotify.zip';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonData => {
            const apkUrl = apiUrl + "?alt=media&token=" + jsonData.downloadTokens;
            const link = document.createElement('a');
            link.href = apkUrl;
            link.download = 'Notify.apk';
            document.body.appendChild(link);
            link.click();
            toastr["success"]("Notify App zip is being downloaded. 😀");
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
            downloadLocalApk();
        });
}

function downloadApkFromLink(apkUrl) {
    fetch(apkUrl)
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => {
          const blob = new Blob([arrayBuffer], { type: 'application/vnd.android.package-archive' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'Notify.apk';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('Error fetching APK file:', error);
        });
}

function downloadLocalApk() {
  toastr["info"]("Notify App zip is being downloaded. 😀");
  const link = document.createElement('a');
  link.href = "../media/Notify.zip";
  link.download = 'Notify.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const progressBar = document.querySelector('.progress-bar');

function scrollProgressBar() {
  progressBar.style.width = `${((window.scrollY) / (document.body.scrollHeight - window.innerHeight) * 100)}%`;
  requestAnimationFrame(scrollProgressBar);
}

scrollProgressBar();

const changeTheme = document.getElementById('toggle-theme');
changeTheme.onchange = () => {
  if (changeTheme.checked === true) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    window.localStorage.setItem('mode', 'dark');
  } else {  
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    window.localStorage.setItem('mode', 'light');
  }
}
const mode = window.localStorage.getItem('mode');
if (mode == 'dark') {
  changeTheme.checked = true;
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
}

if (mode == 'light') {
  changeTheme.checked = false;
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}