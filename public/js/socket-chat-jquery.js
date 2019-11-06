var params = new URLSearchParams(window.location.search);

const name = params.get('name');
const room = params.get('room');

const divUsers = $('#divUsers');
const formSend = $('#formSend');
const txtMessage = $('#txtMessage');
const divChatbox = $('#divChatbox');


function renderPeople(people) {
    var html = '';
    html += '<li>'
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('room') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < people.length; i++) {
        html += '<li>';
        html += '     <a data-id"' + people[i].id + '><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + people[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html);
}

function renderMessages(message, me) {
    var html = '';
    const date = new Date(message.date);
    const hour = date.getHours + ':' + date.getMinutes();

    var adminClass = 'info';
    if (message.name === 'Admin') {
        adminClass = 'danger';
    }

    if (!me) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + message.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + message.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';

        if (message.name !== 'Admin') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + message.name + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + message.msg + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsers.on('click', 'a', function() {
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formSend.on('submit', function(e) {
    e.preventDefault();
    const val = txtMessage.val();
    if (val.trim().length === 0) {
        return;
    }

    socket.emit('createMsg', {
        name: name,
        msg: val
    }, function(msg) {
        txtMessage.val('').focus();
        renderMessages(msg, true);
        scrollBottom();
    });

});