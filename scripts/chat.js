
const chatTitle = document.getElementById("chatTitle");
const listTitle = document.getElementById("listTitle");
const userOrAdminList = document.getElementById("userOrAdminList");
const chatContainer = document.querySelector(".chat");
const chatWithSpan = document.getElementById("chatWith");
const messagesDiv = document.querySelector(".messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const searchBox = document.getElementById("searchBox");

const chats = JSON.parse(localStorage.getItem("chats")) || {};
const userType = localStorage.getItem("userType"); 
const username = localStorage.getItem("username"); 

console.log(userType);

if (userType === "user") {
  chatTitle.textContent = "Chat with Admins";
  listTitle.textContent = "Available Admins";
  displayAdmins();
} else if (userType === "admin") {
  chatTitle.textContent = "Chat with Users";
  listTitle.textContent = "Available Users";
  displayUsers();
}

function displayAdmins() {
    const adminAccounts = [
      { name: "Deyaa", imgSrc: "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ"}, // تأكد من الروابط
      { name: "Yazan", imgSrc: "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ" },
      { name: "Moamen", imgSrc: "https://th.bing.com/th/id/OIP.USP1T_5fjD1VcqeFBkbNDwHaHa?rs=1&pid=ImgDetMain&fbclid=IwZXh0bgNhZW0CMTEAAR0vJqEiR6evR_QCJCdRw4ypP4gCVb0VWgYTiF_7eJjsuIUTM9jaS0f4f8I_aem_Pm_DYSNedC84sovrP1OEgQ" } 
    ];
  
    adminAccounts.forEach((admin) => {
      const adminDiv = document.createElement("div");
      adminDiv.className = "admin-item";
      
      adminDiv.innerHTML = `
        <div class="admin">
          ${admin.imgSrc ? 
            `<img src="${admin.imgSrc}" alt="${admin.name}" class="admin-img">` : 
            `<div class="no-img"></div>`}
        </div>
        <p>${admin.name}</p>
      `;
      
      userOrAdminList.appendChild(adminDiv);
  
      adminDiv.addEventListener("click", () => selectChat(admin.name));
    });
  
    searchBox.addEventListener("input", filterAdmins);
  }
  
  

function displayUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "admin-item";
    userDiv.innerHTML = `<div class="users"></div><p>${user.username}</p>`;
    userOrAdminList.appendChild(userDiv);

    userDiv.addEventListener("click", () => selectChat(user.username));
  });

  searchBox.addEventListener("input", filterUsers);
}

function filterAdmins() {
  const searchText = searchBox.value.toLowerCase();
  const adminItems = document.querySelectorAll(".admin-item");

  adminItems.forEach((adminItem) => {
    const adminName = adminItem.querySelector("p").textContent.toLowerCase();
    if (adminName.includes(searchText)) {
      adminItem.style.display = "block";
    } else {
      adminItem.style.display = "none";
    }
  });
}

function filterUsers() {
  const searchText = searchBox.value.toLowerCase();
  const userItems = document.querySelectorAll(".admin-item");

  userItems.forEach((userItem) => {
    const userName = userItem.querySelector("p").textContent.toLowerCase();
    if (userName.includes(searchText)) {
      userItem.style.display = "block";
    } else {
      userItem.style.display = "none";
    }
  });
}

function selectChat(target) {
  chatWithSpan.textContent = target;
  chatContainer.style.display = "block";

  const chatKey = generateChatKey(username, target);
  const chatMessages = chats[chatKey] || [];
  messagesDiv.innerHTML = ""; 

  chatMessages.forEach((message) => {
    const messageElement = document.createElement("p");
    const senderName = message.sender === username ? "You" : message.sender;
    messageElement.className = message.sender === username ? "user-message" : "admin-message";
    messageElement.innerHTML = `<strong>${senderName}:</strong> ${message.text}`;
    messagesDiv.appendChild(messageElement);
  });

  sendButton.onclick = () => sendMessage(target);
}

function sendMessage(target) {
  const messageText = messageInput.value.trim();
  if (!messageText) return;

  const chatKey = generateChatKey(username, target);
  if (!chats[chatKey]) {
    chats[chatKey] = [];
  }

  const newMessage = { sender: username, text: messageText };
  chats[chatKey].push(newMessage);
  localStorage.setItem("chats", JSON.stringify(chats));

  const messageElement = document.createElement("p");
  const senderName = newMessage.sender === username ? "You" : newMessage.sender;
  messageElement.className = newMessage.sender === username ? "user-message" : "admin-message";
  messageElement.innerHTML = `<strong>${senderName}:</strong> ${newMessage.text}`;
  messagesDiv.appendChild(messageElement);

  messageInput.value = "";
}

function generateChatKey(user1, user2) {
  const sortedUsers = [user1.toLowerCase(), user2.toLowerCase()].sort();
  return sortedUsers.join("_");
}

window.addEventListener("storage", (event) => {
  if (event.key === "chats") {
    const updatedChats = JSON.parse(event.newValue);
    const chatKey = generateChatKey(username, document.querySelector("#chatWith").textContent);
    if (updatedChats[chatKey]) {
      loadMessages(updatedChats[chatKey]);
    }
  }
});

function loadMessages(messages) {
  messagesDiv.innerHTML = "";
  messages.forEach((message) => {
    const messageElement = document.createElement("p");
    const senderName = message.sender === username ? "You" : message.sender;
    messageElement.className = message.sender === username ? "user-message" : "admin-message";
    messageElement.innerHTML = `<strong>${senderName}:</strong> ${message.text}`;
    messagesDiv.appendChild(messageElement);
  });
}
