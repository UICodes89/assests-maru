
var CONFIG = {
    root : "/assets/",
    js : "/assets/"
};

var host = window.location.host;
if (host.indexOf('firstborn') > -1) {
    CONFIG.root = "../../assets/";
    CONFIG.js = "../";
}

requirejs.config({
    baseUrl: CONFIG.root + 'js/libs/',
    paths: {
        js: CONFIG.js + 'js/',
        components: CONFIG.js + 'js/components',
        pages: CONFIG.js + 'js/pages',
        jquery : CONFIG.js+ 'js/libs/jquery.min',
        bootstrap: CONFIG.js+'js/libs/bootstrap',
        jqueryui: CONFIG.js+ 'js/libs/jquery-ui',
        themepunch:CONFIG.js+ 'js/libs/jquery.themepunch.tools.min',
        themepunchrevol: CONFIG.js+ 'js/libs/jquery.themepunch.revolution.min',
        selectbox: CONFIG.js+ 'js/libs/jquery.selectbox-0.1.3.min',
        datepicker: CONFIG.js+ 'js/libs/bootstrap-datepicker',
        zepto: CONFIG.js+ 'js/libs/zepto',
        syotimer: CONFIG.js+ 'js/libs/countdown/jquery.syotimer',
        SmoothScroll: CONFIG.js+ 'js/libs/smoothscroll/SmoothScroll',
        isotopetriger: CONFIG.js+ 'js/libs/isotope/isotope-triger',
        fancyboxpack: CONFIG.js+ 'js/libs/isotope/jquery.fancybox.pack',
        isotope: CONFIG.js+ 'js/libs/isotope/isotope.min',
        counterup: CONFIG.js+ 'js/libs/counter-up/jquery.counterup.min',
        waypoints: CONFIG.js+ 'js/libs/waypoints.min',
        boxslider: CONFIG.js + 'js/libs/box-slider',
        rateyo: CONFIG.js + 'js/libs/rateyo.min',
        dropzone: CONFIG.js + 'js/libs/dropzone.min'

    },
    shim: {
        'bootstrap' : {
            'deps' :['jquery']
        },
        'themepunch':{
            'deps':['jquery']
        },
        'themepunchrevol':{
            'deps':['jquery']
        },
        'selectbox':{
            'deps':['jquery']
        },
        'datepicker':{
            'deps':['jquery']
        },
        'counterup':{
            'deps':['jquery']
        },
        'isotope':{
            'deps':['jquery']
        },
        'isotopetriger':{
            'deps':['jquery']
        },
        'syotimer':{
            'deps':['jquery']
        },
        'fancyboxpack':{
            'deps':['jquery']
        },
        'waypoints':{
            'deps':['jquery', 'zepto']
        },
        'boxslider':{
            'deps':['jquery']
        },
        'rateyo': {
            'deps':['jquery']
        }
    }
});

requirejs(['js/main']);