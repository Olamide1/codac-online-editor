var doc = document.getElementById("document");
var id = getUrlParameter('id');
if (!id) {
    location.search = location.search ?
        '&id=' + getUniqueId() : 'id=' + getUniqueId();
    return;
}
function getUniqueId() {
    return 'private-' + Math.random().toString(36).substr(2, 9);
}

// function to get a query param's value
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var pusher = new Pusher(ce3857af67e1cd1de0b2);
// subscribe to the changes via Pusher
var channel = pusher.subscribe(id);
channel.bind('some-fun-event', function (data) {
    // do something meaningful with the data here
});
channel.bind('client-text-edit', function (html) {
    doc.innerHTML = html;
});

function triggerChange(e) {
    channel.trigger('client-text-edit', e.target.innerHTML);
}

doc.addEventListener('input', triggerChange);