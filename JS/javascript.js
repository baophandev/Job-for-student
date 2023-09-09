//Ẩn hiện mật khẩu

function showPassword() {
    var passwordInput = document.getElementById("btnPassword");
    var eyeIcon = document.getElementById("button-eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        
    } else {
        passwordInput.type = "password";
        
    }
}

//dowload biểu mẫu
function downloadFile(event) {
  // Ngăn chặn hành vi mặc định của trình duyệt
  event.preventDefault();
  
  // Lấy liên kết của tập tin
  const fileUrl = event.target.getAttribute('href');
  
  // Tải xuống tập tin
  window.location = fileUrl;
}


//Cơ sở dữ liệu
var data = {
  "accounts": [
    {
      "username": "Phan Gia Bảo",
      "email": "pgbao@gmail.com",
      "password": "123456",
      "anh" : "image/blog.jpg",
      "page" : "giabao.html"
    },
    {
        "username": "Nguyễn Văn Hậu",
        "email" : "nvhau@gmail.com",
        "password" : "567890",
        "anh" : "image/blog.jpg",
        "page" : "#"
    }
  ],
  "list": [
    {
        "code": "67212",
        "tenCV": "Nha khoa Lạc Việt Intech tuyển sale lương 20 triệu",
        "deadline" : "26/10/2023",
        "href": "NhaKhoaLV.html"
    }
  ]
};


//Kiểm tra đăng nhập và lưu thông tin đăng nhập bằng localStorage
function login(){
    var email = document.getElementById("email");
    var btnPassword = document.getElementById("btnPassword");

    for(var i=0; i<data.accounts.length; i++){
        if((data.accounts[i].email === email.value) && (data.accounts[i].password === btnPassword.value)){
            alert("Welcome " + data.accounts[i].username);
            localStorage.setItem("username", data.accounts[i].username);
            localStorage.setItem("anh", data.accounts[i].anh);
            localStorage.setItem("page", data.accounts[i].page);
            window.location.href = "index.html";
            return;
        }
    }
    alert("Email hoặc mật khẩu sai !");
}

//Đăng xuất
function logout(){
    localStorage.clear();
    alert("Đã đăng xuất!");
    window.location.href = "index.html"
}

//Hiện tên người dùng đã đăng nhập trên thanh header
function showusername(){
    var user = document.getElementById("username");
    var username = localStorage.getItem("username");
    var avatar = document.getElementById("avatar");
    if(username){
        user.innerHTML = username;
        avatar.setAttribute("src", localStorage.getItem("anh"));
    }
    
}

//ẩn hiện menu người dùng
function show_menu_usr(){
    var logout = document.getElementById("logout");

    if(logout.style.display == "none")
        logout.style.display = "block";
    else
        logout.style.display = "none";
}

//Kiểm tra người dùng có thể dùng tính năng đăng bài tuyển dụng hay không
function checktuyendung(){
    var check = localStorage.getItem("username");
    if(check){
        window.location.href = "tuyendung.html";
    }else{
        alert("Bạn phải đăng nhập để dùng tính năng này");
        window.location.href = "login.html";
    }
}

//Xem review bài đăng tuyển dụng
const review = () => {
    const TenCV = document.getElementById("TenCV");
    const Mota = document.getElementById("Mota");
    const AnhCT = document.getElementsByClassName("anhCT");
    
    const cardtitle = document.getElementsByClassName("card-title")[0];
    const cardtext = document.getElementsByClassName("card-text")[0];
    const cardimgtop = document.getElementsByClassName("card-img-top")[0];

    cardtitle.innerHTML = TenCV.value;
    cardtext.innerHTML = Mota.value;
    cardimgtop.setAttribute("src", AnhCT[0].value);
}


//THÊM CÔNG VIỆC ĐÃ LƯU
function addcart(){
    var code = document.getElementById("code");

    if(!localStorage.getItem("username")){
        alert("Bạn phải đăng nhập để dùng tính năng này!");
        window.location.href = "login.html";
        return;
    }

    for(var i=0; i<data.list.length; i++){
        if(data.list[i].code == code.innerHTML){
            localStorage.setItem("code", data.list[i].code);
            localStorage.setItem("tenCV", data.list[i].tenCV);
            localStorage.setItem("deadline", data.list[i].deadline);
            localStorage.setItem("href", data.list[i].href);
            alert("Đã lưu công việc!");
        }
    }
}

function jobcart(){
    window.location.href = "jobcart.html";
}

function linkcart(){
    if(localStorage.getItem("username")){
        window.location.href = "jobcart.html";
        return;
    }
    alert("Bạn phải đăng nhập để dùng tính năng này!");
    window.location.href = "login.html";
}

function showcart(){
    var tbody = document.getElementById("tbody");
    if(!localStorage.getItem("code")){
        return;
    }
    var empty_cart = document.getElementById("empty-cart");
    var code = localStorage.getItem("code");
    var tenCV = localStorage.getItem("tenCV");
    var deadline = localStorage.getItem("deadline");
    var href = localStorage.getItem("href");
    var tr = document.createElement("tr");
    
    empty_cart.style.display = "none";

    tr.innerHTML = `
        <tr>
            <td>${code}</td>
            <td><a href="${href}" style="text-decoration: none; color: rgb(37, 96, 96); font-weight: bold;">${tenCV}</td>
            <td>${deadline}</td>
            <td><button>NỘP CV</button></td>
            <td><button onclick="removecart()">XÓA</button></td>
        </tr>
    `;

    tbody.appendChild(tr);
}

//XÓA LƯU BÀI TUYỂN DỤNG
function removecart(){
    localStorage.removeItem("code");
    location.reload();
}

//KIỂM TRA SỰ KIỆN ĐĂNG KÝ
function validate(){
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var repeat_password = document.getElementById("repeat-password");
    

    if(username.value == ""){
        alert("Vui lòng nhập Tên người dùng");
        username.focus();
        return;
    }

    if(email.value == ""){
        alert("Vui lòng nhập email");
        email.focus();
        return;
    }

    if(password.value == ""){
        alert("Vui lòng nhập mật khẩu");
        password.focus();
        return;
    }

    if(repeat_password.value != password.value){
        alert("Nhập lại mật khẩu sai");
        repeat_password.focus();
        return;
    }

    alert("Đăng ký thành công")
    window.location.href = "login.html"
}


function checkdata(){
    if(localStorage.getItem("username")){
        return;
    }
    alert("Bạn phải đăng nhập để dùng tính năng này");
}

//ĐĂNG BÀI TUYỂN DỤNG
function post(){
    var TenCV = document.getElementById("TenCV");
    var Mota = document.getElementById("Mota");
    var money = document.getElementById("money");
    var address = document.getElementById("address");
    var time = document.getElementById("time");
    var anhCT = document.getElementById("anhCT");

    if(TenCV.value == ""){
        alert("Vui lòng điền tên công việc");
        TenCV.focus();
        return;
    }

    if(time.value == ""){
        alert("Vui lòng điền thời gian làm việc!");
        time.focus();
        return;
    }

    if(money.value == ""){
        alert("Vui lòng điền lương nhân viên");
        money.focus();
        return;
    }

    if(address.value == ""){
        alert("Vui lòng điền địa chỉ doanh nghiệp");
        address.focus();
        return;
    }

    if(Mota.value == ""){
        alert("Vui lòng điền mô tả");
        Mota.focus();
        return;
    }


    localStorage.setItem("TenCV", TenCV.value);
    localStorage.setItem("Mota", Mota.value);
    localStorage.setItem("money", money.value);
    localStorage.setItem("address", address.value);
    localStorage.setItem("anhCT", anhCT.value);


    alert("Bài đã được đăng")
    window.location.href = "index.html";
}

//SHOW BÀI TUYỂN DỤNG LÊN TRANG CHỦ VÀ TRANG VIỆC LÀM
function showpost() {
    if(!localStorage.getItem("TenCV")){
        return;
    }
    var jobs = document.getElementById("jobs");
    var div = document.createElement("div");
    var TenCV = localStorage.getItem("TenCV");
    var Mota = localStorage.getItem("Mota");
    var money = localStorage.getItem("money");
    var address = localStorage.getItem("address");
    var anhCT = localStorage.getItem("anhCT");

    div.innerHTML = `
        <div class="jobs-container">
                <div class="jobs-img">
                    <img src="${anhCT}" alt="">
                    <div>
                        <a href="">XEM CHI TIẾT</a>
                    </div>
                </div>
                <div class="job-content">
                    <a href="">${TenCV}</a>
                    <p>${Mota}</p>
                    <ul>
                        <li>
                            <p style="color: #8F43EE;"><i class="fas fa-money-bill-wave"></i> ${money}</p>
                            <p style="color: #FFB84C;"><i class="fas fa-map-marker-alt"></i> ${address}</p>
                            <p style="color: #7DB9B6;"><i class="fas fa-eye"></i> 0</p>
                        </li>
                    </ul>
                </div>
                <button onclick="removepost()" style="background-color: transparent; border: none; color: red; font-size: 20px;"><i class="fas fa-trash-alt"></i></button>
            </div>
    `;
    jobs.appendChild(div);
}


//XÓA BÀI ĐĂNG
function removepost(){
    localStorage.removeItem("TenCV");
    alert("Bạn thật sự muốn xóa bài đăng");
    location.reload();
}

//LIKE VÀ DIS LIKE TRONG BLOG
const thumbsUpCount = document.getElementById("thumbs-up-count");
const thumbsDownCount = document.getElementById("thumbs-down-count");
;

		//Thêm sự kiện click cho từng thẻ p
thumbsUpCount.addEventListener("click", function() {
	let currentNumber = parseInt(thumbsUpCount.innerHTML);
	thumbsUpCount.innerHTML = currentNumber + 1;
});

thumbsDownCount.addEventListener("click", function() {
	let currentNumber = parseInt(thumbsDownCount.innerHTML);
	thumbsDownCount.innerHTML = currentNumber + 1;
});

function comment(){

    var chat = document.getElementById("chat");
    var div = document.createElement("div");
    var binhluan = document.getElementById("binhluan").value;
    var username = localStorage.getItem("username");
    var anh = localStorage.getItem("anh");

    if(!localStorage.getItem("username")){
        alert("Bạn phải đăng nhập để dùng tính năng này!");
        window.location.href = "login.html";
        return;
    }

    div.innerHTML = `
         <div class="chat-content">
            <img src="${anh}" alt="">
            <div class="chat-user">
                <a href="">${username}</a>
                <p class="start"><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i></p>
                <p>${binhluan}</p>
            </div>
        </div>
    `;

    chat.appendChild(div);
}
