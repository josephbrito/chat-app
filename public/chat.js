const socket = io('http://localhost:3250');
let user = null;
socket.on('update_messages', messages =>{
    updateMessagesScreen(messages);
});

function updateMessagesScreen(messages){
    const div_messages = document.querySelector("#messages");

    let list_messages = "<ul class='ul-list'>"
    messages.forEach(message =>{
        list_messages += `<li><span class="username">${message.user}</span>: ${message.msg}</li>`
    })
    list_messages += "</ul>"

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        if(!user){
            alert('Define um usuário')
            return;
        }

        const message = document.forms['message_form_name']['msg'].value;
        document.forms['message_form_name']['msg'].value = '';
        socket.emit('new_message', { user: user, msg: message });
    })
    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        user = document.forms['user_form_name']['user'].value;
        userForm.parentNode.removeChild(userForm);
    })
})