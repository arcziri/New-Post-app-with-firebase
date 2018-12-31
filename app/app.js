function getDatePost() {
  var cdate = new Date();
  var day = cdate.getDate();
  var month = cdate.getMonth();
  var year = cdate.getFullYear();
  var hours = cdate.getHours();
  var minutes = cdate.getMinutes();
  var seconds = cdate.getSeconds();
  var currentDate = day + "-" + (month + 1) + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

  return currentDate;
}

var config = {
  apiKey: "AIzaSyDDB9EeadcrDbAaDV5zUu0hNuavW8U4hX0",
  authDomain: "appdata-99157.firebaseapp.com",
  databaseURL: "https://appdata-99157.firebaseio.com",
  projectId: "appdata-99157",
  storageBucket: "appdata-99157.appspot.com",
  messagingSenderId: "885183762139"
};

firebase.initializeApp(config);

const database = firebase.database();
const ref = database.ref('/posts');


//The child_added event fires immediately for every existing post, and then once for each post you add.
ref.on('child_added', snapshot => {
  const data = snapshot.val();
  $("ul").prepend("<br><li><h3>" + data.nickname + "</h3>" + data.textarea + "<br><p>Dodano: " + data.date + "</p></li>");
});

$("#button").on("click", function () {
  nickname = $("#input").val().trim();
  textarea = $("#textarea").val().trim();
  const date = getDatePost();
  const newPost = ref.push();

  newPost.set({
    nickname: nickname,
    textarea: textarea,
    date: date
  });
  $("#input").val("");
  $("#textarea").val("");
});