;app.my=(function(){
    function init() {
        insertAvatar()
    }


    function insertAvatar() {
        var avatarJson=window.avatarJson;

        $("#course-list-box").find('[data-guest-id]').each(function () {

            $(this).prepend(`<img class="img" src="images/${avatarJson[$(this).data('guestId')]}">`)
        })
    }

    return {
        init:init,
    }
}());