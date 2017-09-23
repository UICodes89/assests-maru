define(function(require) {
    var $ = require('jquery'),
        bootstrap = require('bootstrap'),
        jqueryUI = require('jqueryui'),
        themepunch = require('themepunch'),
        themepunchrevol = require('themepunchrevol'),
        selectBox =  require('selectbox'),
        datepicker = require('datepicker'),
        syotimer = require("syotimer"),
        SmoothScroll = require("SmoothScroll"),
        isotopetriger = require("isotopetriger"),
        fancyboxpack = require("fancyboxpack"),
        isotope = require("isotope");
        //counterup = require("counterup");
        //waypoints = require('waypoints');

        $(function () {
            $.get("/product/productshowcase", function (html) {
                $("#showcase").html(html);

                //limit text to first paragraph
                $('.productDesc').each(function (i, val) {
                    $(val).find('p').slice(1).remove();
                });
            });
        });

            var custom = require("components/custom");
                customObj = new custom();

               $(document).ready(function(){
                   $('.secondslide').revolution({
                       delay: 5000,
                       startwidth: 1170,
                       startheight: 745,
                       fullWidth: "on",
                       fullScreen: "off",
                       hideCaptionAtLimit: "",
                       dottedOverlay: "twoxtwo",
                       navigationStyle: "preview4",
                       fullScreenOffsetContainer: "",
                       hideTimerBar: "on"
                   });
               });


            var isReviewPage = $(".review-page-available").length;

            if(isReviewPage){
                var reviewSection = require('components/review-section');
                reviewSectionObj = new reviewSection();
            }
});