var num_of_resources, num_of_activities,
    cons_weighted_score,
    multiplier,
    resource_estimated_no = 2,
    activity_estimated_no = 5,
    expected = 0,
    student1 = 0,
    student2 = 0;
    var basket=0;
    var basket1 = 0;
    var basket2 = 0;
    var basketminus3;  
$(document).ready(function(){  
    function Basket(basket,v){
        if(basket<=0){               
                $('#basket'+v +' .e_basket1').hide();
                $('#basket'+v +' .e_basket2').hide();
                $('#basket'+v +' .e_basket3').hide();
                $('#basket'+v +' .sum_of_basket').hide();
        }else{
            if(basket==1){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').hide();
                $('#basket'+v +' .e_basket3').hide();
                $('#basket'+v +' .sum_of_basket').hide();
            }else if(basket==2){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();                    
                $('#basket'+v +' .e_basket3').hide();
                $('#basket'+v +' .sum_of_basket ').hide();
            }else if(basket==3){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();
                $('#basket'+v +' .e_basket3').show();
                $('#basket'+v +' .sum_of_basket ').hide();
            }else if(basket>3){
                $('#basket'+v +' .e_basket1').show();
                $('#basket'+v +' .e_basket2').show();
                $('#basket'+v +' .e_basket3').show();
                $('#basket'+v +' .sum_of_basket ').show();
                 basketminus3 = basket-3;
                $('#basket'+v +' .sum_of_basket  h3').html('and '+basketminus3+ ' more.'); 

            }
        }
    }

    $('table tr:first-child').click(function(){
        $(this).siblings().toggle();
    });
    $('#go').hide();
    $('#activities, #resources, #discussions').on('input',function(){
        num_of_resources = $('#resources').val();
        num_of_activities = $('#activities').val();    
        num_of_discussion = $('#discussions').val();     
         if(num_of_activities && num_of_resources && num_of_discussion){          
            $('#go').show();
         }
    });
    
    $('body').on('click','#go',function(){       
        num_of_resources = $('#resources').val();
        num_of_activities = $('#activities').val();      
        num_of_discussion = $('#discussions').val();      
        expected = 0,
        student1 = 0,
        student2 = 0;
        cons_weighted_score=0
        multiplier=0;
        basket=0;
        basket1 = 0;
        basket2 = 0;
        $('#wrapper').hide();
        if(num_of_activities && num_of_resources){ 
            $('#go').hide();  
            $('#wrapper').show();
            $('#no_of_resources').text(num_of_resources);
            $('#no_of_activities').text(num_of_activities);
            $('#no_of_discussions').text(num_of_discussion);
            $('#weighted_score_resources').text('2 X '+num_of_resources+' = '+2*num_of_resources);
            $('#weighted_score_activities').text('5 X '+num_of_activities+' = '+5*num_of_activities);
            $('#weighted_score_discussions').text('5 X '+num_of_discussion+' = '+5*num_of_discussion);
            cons_weighted_score = (2*num_of_resources)+(5*num_of_activities)+(5*num_of_discussion);
            $('#weighted_score').text(cons_weighted_score);

            cons_weighted_score = cons_weighted_score * 75 / 100;
            $('#cons_weighted_score').text(cons_weighted_score); //+' ( 75% of ('+2*num_of_resources+' + '+ 5*num_of_activities+'))'
            $('#multiplier').text(Math.round((80/cons_weighted_score)*100)/100);

            multiplier = 80/cons_weighted_score;
            expected = (multiplier*cons_weighted_score)/20;
            $('#first_day').text(Math.round((multiplier*cons_weighted_score)/20*100)/100);
            $('#second_day').text(Math.round((multiplier*cons_weighted_score)/30*100)/100);
            $('#first_week').text(Math.round((multiplier*cons_weighted_score)/50*100)/100);

            console.log('expected : '+expected);    
            $('#main_score span:first').html( Math.round((expected - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((expected-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(expected*100 )/100);
            $('#student1_score span:first').html(0);
            $('#student1_score span:eq(1)').html(0);
            $('#student1_score span:eq(2)').html(0);
            $('#student2_score span:first').html(0);
            $('#student2_score span:eq(1)').html(0);
            $('#student2_score span:eq(2)').html(0);
        }

        if(expected<=100){
                basket=0;
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(expected) +".png'>";
            }else{
                basket = parseInt((expected - 80) / 20);
                console.log('basket :'+ basket);
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(80 +( expected % 20)) +".png'>"; 

             }
            if(student1<=100){
                basket1=0;
                 document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(student1) +".png'>";
            }else{                              
                basket1 = parseInt((student1 - 80) / 20);              
                console.log('basket1 :'+ basket1);
                document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(80 +( student1 % 20)) +".png'>";      
            }
            if(student2<=100){
                basket2=0;
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(student2) +".png'>";
            }else{
                basket2 = parseInt((student2 - 80) / 20);               
                console.log('basket2 :'+ basket2);
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(80 +( student2 % 20)) +".png'>";      

            }          
            Basket(basket,'');
            Basket(basket2,2);
            Basket(basket1,1);

    });

   
    $('#wrapper').append($('.inner-wrapper').eq(1).clone());
    $('.inner-wrapper:last').show();
    $('.inner-wrapper:last #delete').hide();    



// delete particular
    $('body').on("click","#delete:visible",function(){       
        $(this).parent().parent().find('select:visible').each(function(){               
            if($(this).val()=='activity'){
                expected -= 5*multiplier;
            }else if($(this).val()=='resource'){
                expected -= 2*multiplier;
            }else if($(this).val()=='discussion'){
                expected -= 5*multiplier;
            }else if($(this).parent().hasClass('middle')){
                student1 -= $(this).val()*multiplier;
                if((Math.round((Math.round(student1) - $(this).val())/multiplier))<0){
                     $('#student1_score span:first').html(0);
                }else{
                    $('#student1_score span:first').html(Math.round((Math.round(student1) - $(this).val())/multiplier));
                }                   
                if((Math.round((Math.round(student1)-$(this).val())*100)/100)<0){
                     $('#student1_score span:eq(1)').html(0);
                }else{
                    $('#student1_score span:eq(1)').html(Math.round((Math.round(student1)-$(this).val())*100)/100);
                }
                if((Math.round(student1*100 )/100)<0){
                     $('#student1_score span:eq(2)').html(0);
                }else{
                    $('#student1_score span:eq(2)').html(Math.round(student1*100 )/100);
                }
                
            }else if($(this).parent().hasClass('right')){
                student2 -= $(this).val()*multiplier;
                if((Math.round((Math.round(student2) - $(this).val())/multiplier))<0){
                    $('#student2_score span:first').html(0);
                }else{
                    $('#student2_score span:first').html(Math.round((Math.round(student2) - $(this).val())/multiplier));               
                }
                  
                 if((Math.round((Math.round(student2)-$(this).val())*100)/100)<0){
                     $('#student2_score span:eq(1)').html(0);
                }else{
                    $('#student2_score span:eq(1)').html(Math.round((Math.round(student2)-$(this).val())*100)/100);
                }
                if((Math.round(student2*100 )/100)<0){
                     $('#student2_score span:eq(2)').html(0);
                }else{
                    $('#student2_score span:eq(2)').html(Math.round(student2*100 )/100);
                }            
            }            
        });
         if(expected<=100){
                basket=0;
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(expected) +".png'>";                
            }else{
                basket = parseInt((expected - 80)/20);
                console.log('basket :'+ basket);
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(80 +( expected % 20)) +".png'>";      
             }
            if(student1<=100){
                 basket1=0;
                 document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(student1) +".png'>";
            }else{
                basket1 = parseInt((student1 - 80)/20);               
                console.log('basket1 :'+ basket1);
                document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(80 +( student1 % 20)) +".png'>";      
            }
            if(student2<=100){
                basket2=0;
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(student2) +".png'>";
            }else{
                basket2 =parseInt((student2 - 80)/20);               
                console.log('basket2 :'+ basket2);
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(80 +( student2 % 20)) +".png'>";      

            } 
            Basket(basket,'');
            Basket(basket2,2);
            Basket(basket1,1);
            $('#main_score span:first').html( Math.round((expected - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((expected-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(expected*100 )/100);


       $(this).parent().parent().remove();    
    });

// particular select
    $('body').on("change",".selected_particular",function(){
        
        if($(this).val()=='activity' || $(this).val()=='discussion'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().find('[name=typeactivity]').show();
            $(this).parent().siblings('.middle, .right').find('[name="submission"]').show();
            $(this).parent().siblings('.middle, .right').find('[name="viewed"]').hide();
            $(this).parent().find('[name=typeresourse]').hide();
            $(this).prop('disabled', true);
            expected += 5*multiplier;
            console.log('expected : '+expected);           
            $(this).next().html('5');
        }else if($(this).val()=='resource'){
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            $(this).parent().find('[name=typeresourse]').show();
            $(this).parent().siblings('.middle, .right').find('[name="submission"]').hide();
            $(this).parent().siblings('.middle, .right').find('[name="viewed"]').show();
            $(this).parent().find('[name=typeactivity]').hide();
            $(this).prop('disabled', true);
            expected += 2*multiplier;
            console.log('expected : '+expected);
            $(this).next().html('2');
        }else if($(this).val()=='new_week'){
            $('<div class="new_week">New week started</div>').insertAfter( $('.inner-wrapper:last '));
            $('.inner-wrapper:last').clone().insertAfter($('.new_week:last'));  
            $(this).parent().parent().remove();             
        }
         if(expected<=100){
                basket=0;
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(expected) +".png'>";
            }else{
                basket = parseInt((expected - 80)/20);
                console.log('basket :'+ basket);
                document.getElementById("container_left").innerHTML = "<img src=' "+ Math.round(80 +( expected % 20)) +".png'>";      
             }

            Basket(basket,'');
            $('#main_score span:first').html( Math.round((expected - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((expected-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(expected*100 )/100);
    });

//login time
    $('body').on("change",".loginday",function(){
        if($(this).parent().hasClass('middle')){
            if($(this).val()==4){
                student1 = ((multiplier*cons_weighted_score)/20);
            }else if($(this).val()==3){
                student1 = ((multiplier*cons_weighted_score)/30);
            }else if($(this).val()==2){
                student1 = ((multiplier*cons_weighted_score)/50);
            }else{
                student1 = 0;
            }
            $(this).next().html($(this).val());
            $('.middle .submission:not(:first)').each(function(){
            if(isFinite($(this).val())){
                student1 += $(this).val()*multiplier;
            }                   
            });
            $('.middle .viewed:not(:first)').each(function(){
                if(isFinite($(this).val())){
                    student1 += $(this).val()*multiplier;
                }

            });

            console.log('student1 : '+student1);


            if(student1<=100){
                basket1=0;
                 document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(student1) +".png'>";
            }else{
                basket1 = parseInt((student1 - 80)/20);              
                console.log('basket1 :'+ basket1);
                document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(80 +( student1 % 20)) +".png'>";      
            }

            Basket(basket1,1);

            $('#student1_score span:first').html(Math.round((student1 - $(this).val())/multiplier));
            if(student1){
                $('#student1_score span:eq(1)').html(Math.round(student1-$(this).val()));
            }else{
                $('#student1_score span:eq(1)').html(0);
            }
            $('#student1_score span:eq(2)').html(Math.round(student1));
        }else if($(this).parent().hasClass('right')){
            if($(this).val()==4){
                student2 = ((multiplier*cons_weighted_score)/20);
            }else if($(this).val()==3){
                student2 = ((multiplier*cons_weighted_score)/30);
            }else if($(this).val()==2){
                student2 = ((multiplier*cons_weighted_score)/50);
            }else{
                student2 = 0;
            }
            $(this).next().html($(this).val());
            $('.right .submission:not(:first)').each(function(){
            if(isFinite($(this).val())){
                student2 += $(this).val()*multiplier;                
            }                   
            });
            $('.right .viewed:not(:first)').each(function(){
                if(isFinite($(this).val())){
                    student2 += $(this).val()*multiplier;
            }

            });

            console.log('student2 : '+student2);


            if(student2<=100){
                basket2=0;
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(student2) +".png'>";
            }else{
                basket2 = parseInt((student2 - 80)/20);              
                console.log('basket2 :'+ basket2);
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(80 +( student2 % 20)) +".png'>";      

            } 
            Basket(basket2,2);
            $('#student2_score span:first').html(Math.round((student2 - $(this).val())/multiplier));
            if(student2){
                $('#student2_score span:eq(1)').html(Math.round(student2-$(this).val()));
            }else{
                $('#student2_score span:eq(1)').html(0);
            }
            $('#student2_score span:eq(2)').html(Math.round(student2 ));
        }                       
    });    

// particular type
    $('body').on("change",".submission,.viewed",function(){

        if($(this).parent().hasClass('middle')){         
           var value = $('.middle .loginday').val();
           if(value==4){
               student1 = ((cons_weighted_score*multiplier)/20);
           }else if(value==3){
               student1 = ((cons_weighted_score*multiplier)/30);
           }else if(value==2){
               student1 = ((cons_weighted_score*multiplier)/50);
           }else{
               student1 = 0;
           }

           $('.middle .submission:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   student1 += $(this).val()*multiplier;

               }                   
           });
           $('.middle .viewed:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   student1 += $(this).val()*multiplier;

               }                   
           });
           console.log(student1);        

            if(student1<=100){
                basket1=0;
                document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(student1) +".png'>";
            }else{
                basket1 = parseInt((student1 - 80)/20);              
                console.log('basket1 :'+ basket1);
                document.getElementById("container_middle").innerHTML = "<img src=' "+ Math.round(80 +( student1 % 20)) +".png'>";      
            }

             Basket(basket1,1);
            $('#student1_score span:first').html(Math.round((Math.round(student1) - value)/multiplier));
            $('#student1_score span:eq(1)').html(Math.round((Math.round(student1)-value)*100)/100);
            $('#student1_score span:eq(2)').html(Math.round(student1*100 )/100);
        }else{
           var value = $('.right .loginday').val();
           if(value==4){
               student2 = ((multiplier*cons_weighted_score)/20);
           }else if(value==3){
               student2 = ((multiplier*cons_weighted_score)/30);
           }else if(value==2){
               student2 = ((multiplier*cons_weighted_score)/50);
           }else{
               student2 = 0;
           }
           $('.right .submission:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   student2 += $(this).val()*multiplier;

               }
           });
           $('.right .viewed:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   student2 += $(this).val()*multiplier;

               }                   
           });

           if(student2<=100){
               basket2=0;
                 document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(student2) +".png'>";
            }else{
                basket2 = parseInt((student2 - 80)/20);                      
                console.log('basket2 :'+ basket2);
                document.getElementById("container_right").innerHTML = "<img src=' "+ Math.round(80 +( student2 % 20)) +".png'>";      
            }

            console.log(student2);   
            Basket(basket2,2);
            $('#student2_score span:first').html(Math.round((Math.round(student2) - value)/multiplier));
            $('#student2_score span:eq(1)').html(Math.round((Math.round(student2)-value)*100)/100);
            $('#student2_score span:eq(2)').html(Math.round(student2*100 )/100);
        }
        $(this).next().html($(this).val());
    });
});        