const $ = (seletor) => document.querySelector(seletor);

$("#openLogin").onclick = () => {
  $(".login").classList.add("open");
  $(".signup").classList.remove("open");
};

$("#openSignup").onclick = () => {
  $(".signup").classList.add("open");
  $(".login").classList.remove("open");
};
