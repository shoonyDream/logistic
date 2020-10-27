import $ from 'jquery';
import select2 from 'select2';
import jqueryMousewheel from 'jquery-mousewheel';
import mCustomScrollbar from 'malihu-custom-scrollbar-plugin';

$('.js-select').select2({
	placeholder: 'Выберите тип системы',
	minimumResultsForSearch: Infinity,
    width: '100%',
    theme: 'default select--dark'
});

$('.select').on('select2:open', function () {
    $('.select2-results__options').mCustomScrollbar('destroy');
    $('.select2-results__options').mCustomScrollbar('update');
    setTimeout(function() {
        $('.select2-results__options').mCustomScrollbar({
            axis: 'y',
            scrollbarPosition: 'inside',
            advanced:{
                updateOnContentResize: true
            },
            live: true
        });
    }, 0);
});
