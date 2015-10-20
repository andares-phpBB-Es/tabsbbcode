/*
* tabmenu Tabbed Menu Script
* version 1.0.2
* info @ http://zenverse.net/tabmenu-tabbed-menu/
* by Zen @ http://zenverse.net/
* License : GPL
* Free for any purpose
*/

//animation style for tabmenu (fade, slide or none)
var tabmenu_animation_style = 'none';

//animation speed for tabmenu (fast, normal, slow or time in milliseconds) - only for fade and slide
//if you are using time milliseconds, don't include the single quote
var tabmenu_animation_speed = 'fast';

(function($tabmenu) { // Avoid conflicts with other libraries

$tabmenu(document).ready(function() {
var nth_tabmenu = 0;
var tabmenu_firsttab = [];

if (!tabmenu_animation_speed) {
tabmenu_animation_speed = 'fast';
}
 
$tabmenu('.tabmenu').each( function() {
var gettabtitle = [],gettabcontent = [];
tabmenu_firsttab[nth_tabmenu] = 0;
var loop = 0;
  
  $tabmenu(this).find('.tab').each( function () {
    if ($tabmenu(this).hasClass('firsttab')) {
      tabmenu_firsttab[nth_tabmenu] = loop;
    }
    loop++;
  });
  
  $tabmenu(this).find('.tab').find('.tabtitle').each( function () {
    gettabtitle.push($tabmenu(this).html());
  });
    
  $tabmenu(this).find('.tab').find('.tabcontent').each( function () {
    gettabcontent.push($tabmenu(this).html());
  });
    
  if (gettabtitle.length > 0) {
    var htmlcodes = '<ul class="tabmenu_ul">';
  
    for (var i=0;i<gettabtitle.length;i++) {
      htmlcodes += '<li><a href="javascript:void(null)" class="t'+i+'">'+gettabtitle[i]+'</a></li>';
    }
  
    htmlcodes += '</ul><div class="tabcontent_wrapper">';
  
    for (var i2=0;i2<gettabcontent.length;i2++) {
      htmlcodes += '<div class="tabcontent">'+gettabcontent[i2]+'</div>';
    }
  
    htmlcodes += '</div>';
  
    $tabmenu(this).removeClass('tabmenu').addClass('tabmenu_live').attr('id','tabmenu_id_'+nth_tabmenu).html(htmlcodes);

    $tabmenu(this).find('.tabcontent').not(':eq('+tabmenu_firsttab[nth_tabmenu]+')').hide();
    $tabmenu(this).find('.tabmenu_ul li  a').eq(tabmenu_firsttab[nth_tabmenu]).addClass('current');
   
  }

nth_tabmenu++;  
});

  $tabmenu('.tabmenu_live').find('.tabmenu_ul > li > a').click( function(event) {
    var currzentab = $tabmenu(this).parent('li').parent('ul').parent('.tabmenu_live');
    var currid = currzentab.attr('id').replace('tabmenu_id_','');
    
    var currnth = $tabmenu(this).attr('class').replace('t','');
    var childnum = parseInt(currnth);
    if (tabmenu_firsttab[currid] == childnum) { event.preventDefault(); return false; }
    
    currzentab.find('.tabmenu_ul li  a').removeClass('current');
    
    if (currzentab.find('.tabcontent').is(':animated')) { 
      //something is animating
      currzentab.find('.tabcontent').is(':animated').stop(true,true);
    }
    
    //tabmenu_animation_speed = 'fast';
    switch (tabmenu_animation_style) {
      case 'fade':
      currzentab.find('.tabcontent:eq('+tabmenu_firsttab[currid]+')').fadeOut(tabmenu_animation_speed, function() {
        currzentab.find('.tabcontent:eq('+childnum+')').fadeIn(tabmenu_animation_speed);
        currzentab.find('.tabmenu_ul li').eq(childnum).children('a').addClass('current');
      }); 
      break;
      case 'none':
      currzentab.find('.tabcontent:eq('+tabmenu_firsttab[currid]+')').hide(10, function() {
        currzentab.find('.tabcontent:eq('+childnum+')').show();
        currzentab.find('.tabmenu_ul li').eq(childnum).children('a').addClass('current');
      }); 
      break;
      default:
      currzentab.find('.tabcontent:eq('+tabmenu_firsttab[currid]+')').slideUp(tabmenu_animation_speed, function() {
        currzentab.find('.tabcontent:eq('+childnum+')').slideDown(tabmenu_animation_speed);
        currzentab.find('.tabmenu_ul li').eq(childnum).children('a').addClass('current');
      }); 
      break;
    }   
    
    tabmenu_firsttab[currid] = childnum;
    event.preventDefault(); //return false;
  });
  

    
});

})(jQuery); // Avoid conflicts with other libraries