 $(document).ready(function(){ 
    function Tree(tree,value)        //generate tree and basket
    {
        
        if(tree<=100){
                basket=0;
				document.getElementById("container_"+value).innerHTML = "<img src=' "+ Math.round(tree) +".png'>";
                        }
        else{
                basket = parseInt((tree - 80) / 20);
                console.log('basket :'+ basket);
                document.getElementById("container_"+value).innerHTML = "<img src=' "+ Math.round(80 +( tree % 20)) +".png'>"; 
                }
				return basket;
				
    }
    function Main_score_l()
    {
            $('#main_score span:eq(0)').html( Math.round((tree_l - 4)/multiplier));
            $('#main_score span:eq(1)').html(Math.round((tree_l-4)*100)/100);
            $('#main_score span:eq(2)').html(Math.round(tree_l*100 )/100);

    }
    function particularSelect(val)
    {
            $('.inner-wrapper:last #delete').show();
            $('#wrapper').append($('.inner-wrapper:last').clone());  
            $('.inner-wrapper:last #delete').hide();
            tree_l += val*multiplier;
            console.log('tree_l : '+tree_l);
    }
    function deleteParticular(tree,num,num1)
    {
                if((Math.round((Math.round(tree) - num1)/multiplier))<0){    //promptness/view submission in span
                     $('#student'+num+'_score span:first').html(0);
                }else{
                    $('#student'+num+'_score span:first').html(Math.round((Math.round(tree) - num1)/multiplier));
                }                   
                if((Math.round((Math.round(tree)-num1)*100)/100)<0){    //normalised score in span
                     $('#student'+num+'_score span:eq(1)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(1)').html(Math.round((Math.round(tree)-num1)*100)/100);
                }
                if((Math.round(tree*100 )/100)<0){        //login bonus in span
                     $('#student'+num+'_score span:eq(2)').html(0);
                }else{
                    $('#student'+num+'_score span:eq(2)').html(Math.round(tree*100 )/100);
                }
    }

    function login(value)
    {        
            if(value==4){
                tree = ((multiplier*cons_weighted_score)/20); //trees generate here at login time
            }else if(value==3){
                tree = ((multiplier*cons_weighted_score)/30);
            }else if(value==2){
                tree = ((multiplier*cons_weighted_score)/50);
            }else{
                tree = 0;
            }
    }
    
    function Basket(basket,v){   //Called function that reflects changes in No. of baskets
        if(basket<=3){
            for(i=1;i<=basket;i++){
            $('#basket'+v +' .e_basket'+i+'').show();
            }
            for(j=i;j<=3;j++){
            $('#basket'+v +' .e_basket'+j+'').hide();
            }
            $('#basket'+v +' .sum_of_basket').hide();
        }
        else{
            for(i=1;i<=3;i++)
            $('#basket'+v +' .e_basket'+i+'').show();
            $('#basket'+v +' .sum_of_basket ').show();
            basketminus3 = basket-3;
            $('#basket'+v +' .sum_of_basket  h3').html('and '+basketminus3+ ' more.'); 
            }
        }        
    $('table tr:first-child').click(function(){
        $(this).siblings().toggle();
    });
    $('#go').hide();
    $('#activities, #resources, #discussions').on('input',function(){
         if($('#resources').val()&&$('#activities').val()&&$('#discussions').val()){          
            $('#go').show();
         }
    });
    
    $('body').on('click','#go',function(){ 
        tree=0,tree_m=0,tree_r=0;
		var Items=[ activities ={Weight:5, Count:$('#activities').val()},
					resources = {Weight:2, Count:$('#resources').val()},
					discussions ={Weight:5, Count:$('#discussions').val()}
				  ]
		if(($('#resources').val()>=0)&&($('#activities').val()>=0)&&($('#discussions').val()>=0))            
        {
            $('#go').hide();  
            $('#wrapper').show();
            $('#weighted_score_resources').text(Items[1].Weight+' X '+Items[1].Count+' = '+(Items[1].Weight)*(Items[1].Count));
            $('#weighted_score_activities').text(Items[0].Weight+' X '+Items[0].Count+' = '+(Items[0].Weight)*(Items[0].Count));
            $('#weighted_score_discussions').text(Items[2].Weight+'X '+Items[2].Count+' = '+(Items[2].Weight)*(Items[2].Count));
            cons_weighted_score = (Items[1].Weight)*(Items[1].Count)+(Items[0].Weight)*(Items[0].Count)+(Items[2].Weight)*(Items[2].Count);
            $('#weighted_score').text(cons_weighted_score);
            cons_weighted_score = cons_weighted_score * 75 / 100;
            $('#cons_weighted_score').text(cons_weighted_score); //+' ( 75% of ('+2*num_of_resources+' + '+ 5*num_of_activities+'))'
            $('#multiplier').text(Math.round((80/cons_weighted_score)*100)/100);
            multiplier = 80/cons_weighted_score;
            tree_l = (multiplier*cons_weighted_score)/20; //tree_l start generated from here  
            Main_score_l();
            $('#student1_score span,#student2_score span').html(0);
          
        Tree(tree_l,0);
        basket_l=basket;
        Tree(tree_m,1);
        basket_m=basket;
        Tree(tree_r,2);
        basket_r=basket;
        Basket(basket_l,0);
        Basket(basket_m,1);
        Basket(basket_r,2);
        
}    else{alert("positive value needed");}    
    
    });
    $('#wrapper').append($('.inner-wrapper').eq(1).clone());
    $('.inner-wrapper:last').show();
    $('.inner-wrapper:last #delete').hide();    

// delete particular
        $('body').on("click","#delete:visible",function(){ 
        $(this).parent().parent().find('select:visible').each(function(){               
            if(($(this).val()=='activity') || ($(this).val()=='discussion')){
                tree_l -= 5*multiplier;
            }else if($(this).val()=='resource'){
                tree_l -= 2*multiplier;
            }
            if($(this).parent().hasClass('middle')){
                number=$(this).val();
                tree_m -= number*multiplier;
                deleteParticular(tree_m,1,number);
                
            }if($(this).parent().hasClass('right')){
                number=$(this).val();
                tree_r -= number*multiplier;
                deleteParticular(tree_r,2,number);
                
            }            
        });
         Tree(tree_l,0);
        basket_l=basket;
         Tree(tree_m,1);
        basket_m=basket;
         Tree(tree_r,2);
         basket_r=basket
         Basket(basket_l,0);
         Basket(basket_r,2);
         Basket(basket_m,1);
            Main_score_l();
           $(this).parent().parent().remove();    
    });

   // particular select
    $('body').on("change",".selected_particular",function(){
        if($(this).val()=='activity' || $(this).val()=='discussion'){
            particularSelect(5);
             $(this).next().html('5');
              $(this).prop('disabled', true);
            $(this).parent().siblings('.middle, .right').find('[name="submission"]').show();
        }else if($(this).val()=='resource'){
            particularSelect(2);
             $(this).prop('disabled', true);
             $(this).next().html('2');
            $(this).parent().siblings('.middle, .right').find('[name="viewed"]').show();
        }else if($(this).val()=='new_week'){
            $('<div class="new_week">New week started</div>').insertAfter( $('.inner-wrapper:last '));
            $('.inner-wrapper:last').clone().insertAfter($('.new_week:last'));  
            $(this).parent().parent().remove();             
        }
         Tree(tree_l,0);
         basket_l=basket;
         Basket(basket_l,0);
         Main_score_l();
           
    });

//login time
    $('body').on("change",".loginday",function(){
        if($(this).parent().hasClass('middle')){
            val=$(this).val();
            login(val);
            tree_m=tree;
            $(this).next().html($(this).val());
            $('.middle .submission:not(:first)').each(function(){
            if(isFinite($(this).val())){
                tree_m += $(this).val()*multiplier;
            }                   
            });
            $('.middle .viewed:not(:first)').each(function(){
                if(isFinite($(this).val())){
                    tree_m += $(this).val()*multiplier;
                }

            });

            console.log('tree_m : '+tree_m);
            

    Tree(tree_m,1);
    basket_m=basket;
    Basket(basket_m,1);

            $('#student1_score span:first').html(Math.round((tree_m - $(this).val())/multiplier));
            if(tree_m){
                $('#student1_score span:eq(1)').html(Math.round(tree_m-$(this).val()));
            }else{
                $('#student1_score span:eq(1)').html(0);
            }
            $('#student1_score span:eq(2)').html(Math.round(tree_m));
        }else if($(this).parent().hasClass('right')){
            val=$(this).val();
            login(val);
            tree_r=tree;
            $(this).next().html($(this).val());
            $('.right .submission:not(:first)').each(function(){
            if(isFinite($(this).val())){
                tree_r += $(this).val()*multiplier;                
            }                   
            });
            $('.right .viewed:not(:first)').each(function(){
                if(isFinite($(this).val())){
                    tree_r += $(this).val()*multiplier;
            }

            });

            console.log('tree_r : '+tree_r);

        Tree(tree_r,2);
        basket_r=basket;
        Basket(basket_r,2);
            $('#student2_score span:first').html(Math.round((tree_r - $(this).val())/multiplier));
            if(tree_r){
                $('#student2_score span:eq(1)').html(Math.round(tree_r-$(this).val()));
            }else{
                $('#student2_score span:eq(1)').html(0);
            }
            $('#student2_score span:eq(2)').html(Math.round(tree_r ));
        }                       
    });    

// particular type
    $('body').on("change",".submission,.viewed",function(){

        if($(this).parent().hasClass('middle')){ 
            val = $('.middle .loginday').val(); 
            login(val);
            tree_m=tree;
           $('.middle .submission:not(:first),.middle .viewed:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   tree_m += $(this).val()*multiplier;
				   }                   
           });
               
          Tree(tree_m,1);
          basket_m=basket;
          console.log('tree_m:'+tree_m);
          Basket(basket_m,1);
          
            $('#student1_score span:eq(0)').html(Math.round((Math.round(tree_m) - val)/multiplier));
            $('#student1_score span:eq(1)').html(Math.round((Math.round(tree_m)-val)*100)/100);
            $('#student1_score span:eq(2)').html(Math.round(tree_m*100 )/100);
        }else{
            val = $('.right .loginday').val();
            login(val);
            tree_r=tree;
           
           $('.right .submission:not(:first),.right .viewed:not(:first)').each(function(){
               if(isFinite($(this).val())){
                   tree_r += $(this).val()*multiplier;

               }
           });
		   
        Tree(tree_r,2);
        basket_r=basket;
        Basket(basket_r,2);
        
            $('#student2_score span:eq(0)').html(Math.round((Math.round(tree_r) - val)/multiplier));
            $('#student2_score span:eq(1)').html(Math.round((Math.round(tree_r)-val)*100)/100);
            $('#student2_score span:eq(2)').html(Math.round(tree_r*100 )/100);
        }
        $(this).next().html($(this).val());
    });
});        