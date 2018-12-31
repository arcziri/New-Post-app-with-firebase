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
  apiKey: "AIzaSyAAV2KE_0BzmxlHpMr86_VjslG_vhJVRXc",
  authDomain: "new-posts-83897.firebaseapp.com",
  databaseURL: "https://new-posts-83897.firebaseio.com",
  projectId: "new-posts-83897",
  storageBucket: "new-posts-83897.appspot.com",
  messagingSenderId: "42678570828"
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