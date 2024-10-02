const ele_text_btn = $('.controls-bar button#text-btn');
const ele_resize_btn = $('.controls-bar button#resize-btn');
const ele_merge_btn = $('.controls-bar button#merge-btn');
const ele_split_btn = $('.controls-bar button#split-btn');
const ele_add_btn = $('.controls-bar button#add-btn');
const ele_del_btn = $('.controls-bar button#del-btn');

const ele_add_bar = $('.add-bar');
const ele_add_up = $('.add-bar button#add-up');
const ele_add_down = $('.add-bar button#add-down');
const ele_add_left = $('.add-bar button#add-left');
const ele_add_right = $('.add-bar button#add-right');

const ele_menu_btn = $('.controls-bar button#menu-btn');
const ele_menu = $('.menu');
const ele_saveimg = $('.as-list #save-img');
const ele_savejson = $('.as-list #save-json');
const ele_loadjson= $('.as-list #load-json');
const ele_divider_switch = $('.as-list #cell-divider');

// tool selection
var tool = 'text';
ele_text_btn.addClass('selected-controls');
ele_add_bar.hide();
ele_text_btn.on('click',function(){
    tool = 'text';
    ele_text_btn.addClass('selected-controls');
    ele_resize_btn.removeClass('selected-controls');
    ele_merge_btn.removeClass('selected-controls');
    ele_split_btn.removeClass('selected-controls');
    ele_add_btn.removeClass('selected-controls');
    ele_del_btn.removeClass('selected-controls');
    ele_add_bar.hide();
});
ele_resize_btn.on('click',function(){tool = 'resize';ele_text_btn.removeClass('selected-controls');ele_resize_btn.addClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.removeClass('selected-controls');ele_add_bar.hide();});
ele_merge_btn.on('click',function(){tool ='merge';ele_text_btn.removeClass('selected-controls');ele_resize_btn.removeClass('selected-controls');ele_merge_btn.addClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.removeClass('selected-controls');ele_add_bar.hide();});
ele_split_btn.on('click',function(){tool ='split';ele_text_btn.removeClass('selected-controls');ele_resize_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.addClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.removeClass('selected-controls');ele_add_bar.hide();});
ele_add_btn.on('click',function(){
    tool = 'add';ele_text_btn.removeClass('selected-controls');ele_resize_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.addClass('selected-controls');ele_del_btn.removeClass('selected-controls');
    ele_add_bar.show();
});
ele_del_btn.on('click',function(){
    tool = 'del';ele_text_btn.removeClass('selected-controls');ele_resize_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.addClass('selected-controls');
    ele_add_bar.show();
});

// add selection
var add_direction = 'up';
ele_add_up.addClass('selected-add');
ele_add_up.on('click',function(){
    add_direction = 'up';
    ele_add_up.addClass('selected-add');
    ele_add_down.removeClass('selected-add');
    ele_add_left.removeClass('selected-add');
    ele_add_right.removeClass('selected-add');
});
ele_add_down.on('click',function(){add_direction = 'down';ele_add_up.removeClass('selected-add');ele_add_down.addClass('selected-add');ele_add_left.removeClass('selected-add');ele_add_right.removeClass('selected-add');});
ele_add_left.on('click',function(){add_direction = 'left';ele_add_up.removeClass('selected-add');ele_add_down.removeClass('selected-add');ele_add_left.addClass('selected-add');ele_add_right.removeClass('selected-add');});
ele_add_right.on('click',function(){add_direction = 'right';ele_add_up.removeClass('selected-add');ele_add_down.removeClass('selected-add');ele_add_left.removeClass('selected-add');ele_add_right.addClass('selected-add');});

// menu
ele_menu_btn.on('click',function(){
    if(ele_menu.hasClass('show')){
        ele_menu.removeClass('show');
    }else{
        ele_menu.addClass('show');
    };
});
ele_saveimg.on('click',function(){
    //TODO:
});
ele_savejson.on('click',function(){
    //TODO:
});
ele_loadjson.on('click',function(){
    //TODO:
});
var cell_divider = true;
ele_divider_switch.on('click',function(){
    let val = ele_divider_switch.find('#scd_text').text();
    val = val.split(' : ')[1];
    if(val == 'ON'){
        cell_divider = false;
        ele_divider_switch.find('#scd_text').text('Cell Divider : OFF');
    } else {
        cell_divider = true;
        ele_divider_switch.find('#scd_text').text('Cell Divider : ON');
    };
});