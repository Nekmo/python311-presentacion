
document.addEventListener("DOMContentLoaded", function(event) {
    var div;
    div = document.createElement('div');
    div.classList = "line top";
    document.body.append(div);

    div = document.createElement('div');
    div.classList = "line bottom";
    document.body.append(div);

    div = document.createElement('div');
    div.classList = "line left";
    document.body.append(div);

    div = document.createElement('div');
    div.classList = "line right";
    document.body.append(div);
});
