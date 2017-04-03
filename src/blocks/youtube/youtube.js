import $ from 'jquery';

const youtube = {
    init() {
        this.setSize();
        $(window).resize(this.setSize);
    },
    setSize() {
        $.each($('.youtube'), (i, e) => {
            const parentWidth = $(e).parent().width();
            const parentHeight = $(e).parent().height();
            const ratio = parentWidth / parentHeight;
            let newWidth;
            let newHeight;

            if (ratio > (16 / 9)) {
                newWidth = (parentHeight * 16) / 9;
                newHeight = parentHeight;
            } else {
                newWidth = parentWidth;
                newHeight = (parentWidth / 16) * 9;
            }

            $(e).width(newWidth);
            $(e).height(newHeight);
            $(e).find('iframe').width(newWidth);
            $(e).find('iframe').height(newHeight);
        });
    },
};

module.exports = youtube;
