const ele_edit_btn = $('.controls-bar button#edit-btn');
const ele_merge_btn = $('.controls-bar button#merge-btn');
const ele_split_btn = $('.controls-bar button#split-btn');
const ele_add_btn = $('.controls-bar button#add-btn');
const ele_del_btn = $('.controls-bar button#del-btn');

const ele_add_bar = $('.add-bar');
const ele_add_down = $('.add-bar button#add-down');
const ele_add_right = $('.add-bar button#add-right');

const ele_menu_btn = $('.controls-bar button#menu-btn');
const ele_menu = $('.menu');
const ele_saveimg = $('.as-list #save-img');
const ele_savejson = $('.as-list #save-json');
const ele_loadjson= $('.as-list #load-json');
const ele_divider_switch = $('.as-list #cell-divider');

const ele_fmt = $('.floating-merge-tip');

const ele_ce_text = $('.celledit-text-input');
const ele_ce_width = $('.celledit-size-input-x');
const ele_ce_height = $('.celledit-size-input-y');
const ele_ce_btn = $('.celledit-btn');
const ele_ce_panel = $('.editpanel');

const natele_canvas = document.getElementById('canvas');

// tool selection
var tool = 'edit';
ele_edit_btn.addClass('selected-controls');
ele_add_bar.hide();
ele_edit_btn.on('click',function(){
    tool = 'edit';
    ele_edit_btn.addClass('selected-controls');
    ele_merge_btn.removeClass('selected-controls');
    ele_split_btn.removeClass('selected-controls');
    ele_add_btn.removeClass('selected-controls');
    ele_del_btn.removeClass('selected-controls');
    ele_add_bar.hide();
});
ele_merge_btn.on('click',function(){tool ='merge';ele_edit_btn.removeClass('selected-controls');ele_merge_btn.addClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.removeClass('selected-controls');ele_add_bar.hide();});
ele_split_btn.on('click',function(){tool ='split';ele_edit_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.addClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.removeClass('selected-controls');ele_add_bar.hide();});
ele_add_btn.on('click',function(){
    tool = 'add';ele_edit_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.addClass('selected-controls');ele_del_btn.removeClass('selected-controls');
    ele_add_bar.show();
});
ele_del_btn.on('click',function(){
    tool = 'del';ele_edit_btn.removeClass('selected-controls');ele_merge_btn.removeClass('selected-controls');ele_split_btn.removeClass('selected-controls');ele_add_btn.removeClass('selected-controls');ele_del_btn.addClass('selected-controls');
    ele_add_bar.show();
});

// add selection
var add_direction = 'down';
ele_add_down.on('click',function(){add_direction = 'down';ele_add_down.addClass('selected-add');ele_add_right.removeClass('selected-add');});
ele_add_right.on('click',function(){add_direction = 'right';ele_add_down.removeClass('selected-add');ele_add_right.addClass('selected-add');});

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

const cvs_ctx = natele_canvas.getContext('2d');
var now_table = {};
// Example table start
// TODO: del this
now_table = {
    heads: {
        col: [
            ['c1',300],
            ['c2',200],
            ['c3',150],
        ], 
        row: [
            ['r1',100],
            ['r2',100],
            ['r3',100],
        ],
        colh_height: 80,
        rowh_height: 70
    },
    cells: {
        '0-0': ['cell1',true,'parent'],
        '0-1': ['cell2',false,null],
        '0-2': ['cell3',false,null],
        '1-0': ['cell7',true,'0-0'],
        '1-1': ['cell4',false,null],
        '1-2': ['cell5',false,null],
        '2-0': ['cell6',false,null],
        '2-1': ['cell8',false,null],
        '2-2': ['cell7',false,null],
    }
};
// Example table end
natele_canvas.width = window.innerWidth * 1.5;
natele_canvas.height = window.innerHeight * 1.5;
window.addEventListener('resize',function(){
    natele_canvas.width = window.innerWidth * 1.5;
    natele_canvas.height = window.innerHeight * 1.5;
});
function draw(){
    cvs_ctx.clearRect(0,0,natele_canvas.width,natele_canvas.height);
    cvs_ctx.stokeStyle = 'black';
    taple(cvs_ctx,now_table,0,90,cell_divider);
    let testing = false;
    if(!testing){
        requestAnimationFrame(draw);
    };
};
draw();

var merge_select = null;
var editing_cell = '';
natele_canvas.addEventListener('click',function(e){
    let x = e.offsetX * 1.5;
    let y = e.offsetY * 1.5 - 90;
    let clicked_cell = { x: -1, y: -1 };
    let col_head_height = now_table.heads.colh_height;
    let row_head_width = now_table.heads.rowh_height;
    let vcursor_x = row_head_width;
    let vcursor_y = col_head_height;
    for (let i = 0; i < now_table.heads.col.length; i++) {
        if (x >= vcursor_x && x < vcursor_x + now_table.heads.col[i][1]) {
            clicked_cell.x = i;
            break;
        };
        vcursor_x += now_table.heads.col[i][1];
    };
    for (let j = 0; j < now_table.heads.row.length; j++) {
        if (y >= vcursor_y && y < vcursor_y + now_table.heads.row[j][1]) {
            clicked_cell.y = j;
            break;
        };
        vcursor_y += now_table.heads.row[j][1];
    };

    if(tool == 'merge'){
        if(merge_select){
            ele_fmt.removeClass('show');
            if(clicked_cell.x !== -1 && clicked_cell.y !== -1 && merge_select.x !== -1 && merge_select.y !== -1 && merge_select !== clicked_cell){
                let x_diff = Math.abs(merge_select.x - clicked_cell.x);
                let y_diff = Math.abs(merge_select.y - clicked_cell.y);
                if((x_diff === 1 && y_diff === 0) || (x_diff === 0 && y_diff === 1)){
                    let clicked_cell_key = clicked_cell.y + '-' + clicked_cell.x;
                    let merge_select_key = merge_select.y + '-' + merge_select.x;
                    if(now_table.cells[clicked_cell_key][1] === false && now_table.cells[merge_select_key][1] === false){ //两者都为false
                        now_table.cells[clicked_cell_key][1] = true;
                        now_table.cells[clicked_cell_key][2] = merge_select_key;
                        now_table.cells[merge_select_key][1] = true;
                        now_table.cells[merge_select_key][2] = 'parent';
                    } else if(now_table.cells[clicked_cell_key][1] === true && now_table.cells[merge_select_key][1] === false){ //clicked_cell为true，merge_select为false
                        now_table.cells[merge_select_key][1] = true;
                        if(now_table.cells[clicked_cell_key][2] === 'parent'){
                            now_table.cells[merge_select_key][2] = clicked_cell_key;
                        } else {
                            now_table.cells[merge_select_key][2] = now_table.cells[clicked_cell_key][2];
                        };
                    } else if(now_table.cells[clicked_cell_key][1] === false && now_table.cells[merge_select_key][1] === true){ //clicked_cell为false，merge_select为true
                        now_table.cells[clicked_cell_key][1] = true;
                        if(now_table.cells[merge_select_key][2] === 'parent'){
                            now_table.cells[clicked_cell_key][2] = merge_select_key;
                        } else {
                            now_table.cells[clicked_cell_key][2] = now_table.cells[merge_select_key][2];
                        };
                    } else if(now_table.cells[clicked_cell_key][1] === true && now_table.cells[merge_select_key][1] === true && now_table.cells[clicked_cell_key][1] !== now_table.cells[merge_select_key][1] && !(now_table.cells[clicked_cell_key][2] === 'parent' && now_table.cells[merge_select_key][2] === 'parent')){ //两者都为true
                        //TODO: bug:无法合并 ↑
                        let goal_parent = null;
                        let died_parent = null;
                        if(now_table.cells[merge_select_key][2] === 'parent'){
                            goal_parent = clicked_cell_key;
                        }else{
                            goal_parent = now_table.cells[merge_select_key][2];
                        };
                        if(now_table.cells[clicked_cell_key][2] === 'parent'){
                            died_parent = merge_select_key;
                        }else{
                            died_parent = now_table.cells[clicked_cell_key][2];
                        };
                        for(let k in now_table.cells){
                            if(now_table.cells[k][2] === died_parent){
                                now_table.cells[k][2] = goal_parent;
                            };
                        };
                    };
                };
            };
            merge_select = null;
        } else {
            merge_select = clicked_cell;
            ele_fmt.find('span').text(merge_select.x + ',' + merge_select.y);
            ele_fmt.addClass('show');
        };
    } else {
        merge_select = null;
        ele_fmt.removeClass('show');
        if(tool == 'edit'){
            editing_cell = clicked_cell;
            if(editing_cell.x == -1){
                ele_ce_text.val(now_table.heads.row[editing_cell.y][0]);
                ele_ce_width.val(now_table.heads.rowh_height);
                ele_ce_width.parent().find('p span').text(now_table.heads.rowh_height);
                ele_ce_height.val(now_table.heads.row[editing_cell.y][1]);
                ele_ce_height.parent().find('p span').text(now_table.heads.row[editing_cell.y][1]);
                ele_ce_panel.addClass('show');
            } else if (editing_cell.y == -1){
                ele_ce_text.val(now_table.heads.col[editing_cell.x][0]);
                ele_ce_width.val(now_table.heads.col[editing_cell.x][1]);
                ele_ce_width.parent().find('p span').text(now_table.heads.col[editing_cell.x][1]);
                ele_ce_height.val(now_table.heads.colh_height);
                ele_ce_height.parent().find('p span').text(now_table.heads.colh_height);
                ele_ce_panel.addClass('show');
            } else {
                let cellKey = editing_cell.y + '-' + editing_cell.x;
                if (now_table.cells[cellKey][1] === true && now_table.cells[cellKey][2] !== 'parent') {
                    let parentCellKey = now_table.cells[cellKey][2];
                    ele_ce_text.val(now_table.cells[parentCellKey][0]);
                } else {
                    ele_ce_text.val(now_table.cells[cellKey][0]);
                };
                if(editing_cell.x == -1){
                    ele_ce_width.val(now_table.heads.rowh_height);
                    ele_ce_width.parent().find('p span').text(now_table.heads.rowh_height);
                    ele_ce_height.val(now_table.heads.row[editing_cell.y][1]);
                    ele_ce_height.parent().find('p span').text(now_table.heads.row[editing_cell.y][1]);
                } else if (editing_cell.y == -1){
                    ele_ce_width.val(now_table.heads.col[editing_cell.x][1]);
                    ele_ce_width.parent().find('p span').text(now_table.heads.col[editing_cell.x][1]);
                    ele_ce_height.val(now_table.heads.colh_height);
                    ele_ce_height.parent().find('p span').text(now_table.heads.colh_height);
                } else {
                    ele_ce_width.val(now_table.heads.col[editing_cell.x][1]);
                    ele_ce_width.parent().find('p span').text(now_table.heads.col[editing_cell.x][1]);
                    ele_ce_height.val(now_table.heads.row[editing_cell.y][1]);
                    ele_ce_height.parent().find('p span').text(now_table.heads.row[editing_cell.y][1]);
                };
                ele_ce_panel.addClass('show');
            };
        } else if(tool == 'split'){
            //TODO:
        } else if(tool == 'add'){
            //TODO:
        } else if(tool == 'del'){
            //TODO:
        };
    };
    // ...
});

// edit
/* ele_ce_btn.on('click',function(){ele_ce_panel.removeClass('show');let cell_index=editing_cell.y+'-'+editing_cell.x;let cell_text=ele_ce_text.val();let cell_width=parseInt(ele_ce_width.val());let cell_height=parseInt(ele_ce_height.val());if(editing_cell.x==-1){now_table.heads.row[editing_cell.y][0]=cell_text;now_table.heads.row[editing_cell.y][1]=cell_height;now_table.heads.rowh_height=cell_width}else if(editing_cell.y==-1){now_table.heads.col[editing_cell.x][0]=cell_text;now_table.heads.col[editing_cell.x][1]=cell_width;now_table.heads.colh_height=cell_height}else{if(now_table.cells[cell_index][1]===true&&now_table.cells[cell_index][2]!=='parent'){let parentCellKey=now_table.cells[cell_index][2];now_table.cells[parentCellKey][0]=cell_text}else{now_table.cells[cell_index][0]=cell_text};now_table.heads.col[editing_cell.x][1]=cell_width;now_table.heads.row[editing_cell.y][1]=cell_height}}); */
ele_ce_width.on('input',function(){
    let val = parseInt($(this).val());
    $(this).parent().find('p span').text(val);
    if(editing_cell.x == -1){
        now_table.heads.rowh_height = val;
    } else if (editing_cell.y == -1){
        now_table.heads.col[editing_cell.x][1] = val;
    } else {
        now_table.heads.col[editing_cell.x][1] = val;
    };
});
ele_ce_height.on('input',function(){
    let val = parseInt($(this).val());
    $(this).parent().find('p span').text(val);
    if(editing_cell.x == -1){
        now_table.heads.row[editing_cell.y][1] = val;
    } else if (editing_cell.y == -1){
        now_table.heads.colh_height = val;
    } else {
        now_table.heads.row[editing_cell.y][1] = val;
    };
});
ele_ce_text.on('input',function(){
    let val = $(this).val();
    if(editing_cell.x == -1){
        now_table.heads.row[editing_cell.y][0] = val;
    } else if (editing_cell.y == -1){
        now_table.heads.col[editing_cell.x][0] = val;
    } else {
        let cell_index = editing_cell.y + '-' + editing_cell.x;
        if(now_table.cells[cell_index][1] === true && now_table.cells[cell_index][2] !== 'parent'){
            let parentCellKey = now_table.cells[cell_index][2];
            now_table.cells[parentCellKey][0] = val;
        } else {
            now_table.cells[cell_index][0] = val;
        };
    };
});
ele_ce_btn.on('click',function(){
    ele_ce_panel.removeClass('show');
});