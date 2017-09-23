define([
    'boxslider',
    'rateyo',
    'dropzone'
], function (boxslider, rateyo, dropzone){

        var replyBtn = $("#replyReview");

        function reviewSection(){
            $(document).ready(function(){
                $('.bxslider').bxSlider({
                    infiniteLoop: false,
                    hideControlOnEnd:true,
                    tickerHover:true,
                    minSlides:2
                });
            });

            $(".reviewMedia .media-list li.review-page-available").each(function(node){
                var isLengthGreaterThanOne = $(this).find("ul li").length >1;
                if(!isLengthGreaterThanOne){
                    console.log("check");
                    $(this).find(".media-left").addClass("hide-control");
                }
                $(this).hover(function(){
                    $(this).find(".media-left .bx-controls .bx-controls-direction").show();
                }, function(){
                    $(this).find(".media-left .bx-controls .bx-controls-direction").hide();
                });
            });

            /*Add review*/

            var imageList = [];
            $(document).ready(function () {
                jQuery(function ($) {
                    $('.ratingReview').each(function () {

                        var elementId = $(this).attr('id');
                        var reviewId = elementId.replace('ratingStar', '');
                        var ratingValue = $('#hiddenRating' + reviewId).val();
                        $('#' + elementId).rateYo({
                            rating: ratingValue,
                            precision: 0,
                            normalFill: "#B0B0B0", /*For background color*/
                            // ratedFill: "#A0A0A0" /*For Selected Color*/,
                            fullStar: true,
                            spacing: "10px",
                            readOnly: true,
                        });
                    });
                })
            });

            $(document.body).on('click', '#addReview', function () {
                $('#reviewTitle').val('');
                $('#new-review').val('');
                $('#reviewIDOnEdit').val('');
                showRating(0);
                $("#ratingStar").rateYo("option", "rating", 0);
                $("#productReviewForm").slideToggle();
            });

            function editReview(reviewId) {
                $('#reviewIDOnEdit').val(reviewId);
                var productId = $('#reviewProductId').val();
                var sdata = { "productId": productId, "reviewId": reviewId };
                $.ajax({
                    type: 'POST',
                    url: "/ProductReview/GetReview",
                    data: JSON.stringify(sdata),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (response) {

                        if (response != null || response != undefined) {

                            $('#reviewTitle').val(response.Title);
                            $('#new-review').val(response.Desc);
                            showRating(response.Rating);
                            $("#ratingStar").rateYo("option", "rating", response.Rating);
                            $("#productReviewForm").show();
                        }
                    }
                })
            }

            function deleteReview(reviewId) {
                var productId = $('#reviewProductId').val();
                var sdata = { "productId": productId, "reviewId": reviewId };
                $.ajax({
                    type: 'POST',
                    url: "/ProductReview/DeleteReview",
                    data: JSON.stringify(sdata),
                    contentType: 'application/json',
                    dataType: 'json',
                    success: function (response) {

                        if (response) {
                            $('#reviewMain-' + reviewId).remove();
                            $('#successMessageDiv').show();

                            setTimeout(function () {
                                $('#successMessageDiv').fadeOut('fast');
                            }, 3000);

                            var countsComment = $('#commentsCountHidden').val() - 1;
                            $('#commentsCount').text("Reviews (" + countsComment + ")");
                            $('#commentsCountHidden').val(countsComment)
                        }
                    }
                })
            }

            function showRating(ratingValue) {
                $("#ratingStar").rateYo({
                    rating: ratingValue,
                    //starWidth: "100px",
                    normalFill: "#B0B0B0", /*For background color*/
                    // ratedFill: "#A0A0A0" /*For Selected Color*/,
                    fullStar: true,
                    spacing: "10px",
                    readOnly: false,
                    precision: 0,
                    onSet: function (rating, rateYoInstance) {
                        $('#counter').text(rating);
                        $('#starRating').val(rating);
                    },

                    onInit: function (rating, rateYoInstance) {

                        $('#counter').text(rating);
                        $('#starRating').val(rating);
                    },
                    onChange: function (rating, rateYoInstance) {
                        var ratingData = Math.ceil(rating);
                        $('#counter').text(ratingData);
                    }
                });
            }

            Dropzone.autoDiscover = false;
            $(document).ready(function () {
                var productId = $('#reviewProductId').val();
                $("#uploadPhotos").dropzone({
                    url: "/ProductReview/SaveUploadedPhoto?productId=" + productId,
                    addRemoveLinks: true,
                    maxFiles: 5, //Max number of files uploaded
                    maxFilesize: 2, // 2 MB max file size
                    success: function (file, response) {
                        imageList.push(response[0]);

                        file.previewElement.classList.add("dz-success");
                    },
                    error: function (file, response) {
                        file.previewElement.classList.add("dz-error");
                    }
                });

            });

            function SetImageValues(imageList) {
                $('#imageList').val(JSON.stringify(imageList));
            }

            $("body").on("click", '#deleteReview',function(){
                var modalId = $(this).data('modalid');
                deleteReview(modalId);
            });

            $("body").on("click", '#editReview',function(){
                var modalId = $(this).data('modalid');
                editReview(modalId);
            });

            $("body").on("click", '#productReviewForm .buttonCustomPrimary', function(){
                SetImageValues(imageList);
            });

            $("body").on("click", "#replyReview", function(){
                $(this).parent("div").find(".reply-box").slideToggle("show");
            });
            
        }
        return reviewSection;
});