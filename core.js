/*
{
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
        colh_height: 70,
        rowh_height: 70
    },
    cells: {
        '0-0': ['cell1',true,'parent'],
        '0-1': ['cell2',false,null],
        '0-2': ['cell3',false,null],
        '1-0': ['',true,'0-0'],
        '1-1': ['cell4',true,'parent'],
        '1-2': ['cell5',false,null],
        '2-0': ['cell6',false,null],
        '2-1': ['',true,'1-1'],
        '2-2': ['cell7',false,null],
    }
}
*/

function draw_text(ctx, text, x, y, width, height){
    if(text.length > 0 && text.trim().length > 0){
        // 自适应字体大小
        let font_family = 'Wanted Sans Std,Noto Sans SC';
        let font_size = '50'; // max
        let text_lines = [];
        let text_line = '';
        let chars = text.split('');
        let line_height = 0;
        let lines_height = 0;
        while(font_size > 1){
            text_lines = [];
            text_line = '';
            ctx.font = `${font_size}px ${font_family}`;
            for(let char of chars){
                if(char == '\n'){
                    text_lines.push(text_line);
                    text_line = '';
                }
                else if(ctx.measureText(text_line + char).width > width){
                    text_lines.push(text_line);
                    text_line = char;
                }else{
                    text_line += char;
                };
            };
            text_lines.push(text_line);
            line_height = ctx.measureText('哈').width * 1.5;
            lines_height = line_height * text_lines.length;
            if(lines_height > height){
                font_size -= 1;
            } else {
                break;
            };
        };
        // 后退一下并绘制文字
        font_size -= 1;
        ctx.font = `${font_size}px ${font_family}`;
        text_lines = [];
        text_line = '';
        for(let char of chars){
            if(char == '\n'){
                text_lines.push(text_line);
                text_line = '';
            }
            else if(ctx.measureText(text_line + char).width > width){
                text_lines.push(text_line);
                text_line = char;
            }else{
                text_line += char;
            };
        };
        text_lines.push(text_line);
        line_height = ctx.measureText('哈').width * 1.5;
        lines_height = line_height * text_lines.length;
        ctx.textBaseline = 'top';
        for(let i = 0; i < text_lines.length; i++){
            ctx.fillText(text_lines[i], x + (width - ctx.measureText(text_lines[i]).width) / 2, y + i * line_height + (height - lines_height) / 2);
        };
    };
};
function draw_line(ctx, from_x, from_y, to_x, to_y, width){
    ctx.beginPath();
    ctx.moveTo(from_x, from_y);
    ctx.lineTo(to_x, to_y);
    ctx.lineWidth = width;
    ctx.stroke();
};
function draw_point(ctx, x, y, size){
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
};

function get_cell_pos(cell_index, head_obj){
    let pos = 0;
    for(let i = 0; i < cell_index; i++){
        pos += head_obj[i][1];
    };
    return pos;
};


function taple(ctx, table_obj, x, y, is_divider){
    let vcursor = {x:x, y:y};

    // 画列头
    vcursor = {x:x, y:y};
    vcursor.x += table_obj.heads.rowh_height;
    for(let col of table_obj.heads.col){
        draw_text(ctx, col[0], vcursor.x, vcursor.y, col[1], table_obj.heads.colh_height);
        if(table_obj.heads.col.indexOf(col) !== 0 && is_divider){
            draw_line(ctx, vcursor.x, vcursor.y + table_obj.heads.colh_height, vcursor.x, vcursor.y + table_obj.heads.colh_height - 10, 4);
        };
        vcursor.x += col[1];
    };
    // 画列分割线
    vcursor.x = x + table_obj.heads.rowh_height;
    vcursor.y += table_obj.heads.colh_height;
    let total_width = table_obj.heads.col.reduce((acc, cur) => acc + cur[1], 0);
    draw_line(ctx, vcursor.x, vcursor.y, vcursor.x + total_width, vcursor.y, 4);
    
    // 画行头
    vcursor = {x:x, y:y};
    vcursor.y += table_obj.heads.rowh_height;
    for(let row of table_obj.heads.row){
        draw_text(ctx, row[0], vcursor.x, vcursor.y, table_obj.heads.rowh_height, row[1]);
        if(table_obj.heads.row.indexOf(row) !== 0 && is_divider){
            draw_line(ctx, vcursor.x + table_obj.heads.rowh_height, vcursor.y, vcursor.x + table_obj.heads.rowh_height - 10, vcursor.y, 4);
        };
        vcursor.y += row[1];
    };
    // 画行分割线
    vcursor.x = x + table_obj.heads.rowh_height;
    vcursor.y = y + table_obj.heads.colh_height + table_obj.heads.row.reduce((acc, cur) => acc + cur[1], 0);
    total_width = table_obj.heads.row.reduce((acc, cur) => acc + cur[1], 0);
    draw_line(ctx, vcursor.x, vcursor.y, vcursor.x, vcursor.y - total_width, 4);
    // fix
    vcursor.x = x + table_obj.heads.rowh_height;
    vcursor.y = y + table_obj.heads.colh_height;
    draw_point(ctx, vcursor.x, vcursor.y, 4);

    // 画单元格
    let spcell_list = []; // list[n] = [parent_key, [child_key1, child_key2, ...]]
    for(let cell_key in table_obj.cells){
        let cell_data = table_obj.cells[cell_key];
        if(!cell_data[1]){
            let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
            let cell_width = table_obj.heads.col[cell_index.x][1];
            let cell_height = table_obj.heads.row[cell_index.y][1];
            vcursor.x = x + table_obj.heads.rowh_height;
            vcursor.x = vcursor.x + get_cell_pos(cell_index.x, table_obj.heads.col);
            vcursor.y = y + table_obj.heads.colh_height;
            vcursor.y = vcursor.y + get_cell_pos(cell_index.y, table_obj.heads.row);
            draw_text(ctx, cell_data[0], vcursor.x, vcursor.y, cell_width, cell_height);
            if(is_divider){
                // 左上
                draw_line(ctx, vcursor.x, vcursor.y, vcursor.x, vcursor.y + 10, 4);
                draw_line(ctx, vcursor.x, vcursor.y, vcursor.x + 10, vcursor.y, 4);
                draw_point(ctx, vcursor.x, vcursor.y, 4);
                // 右上
                if(cell_index.x < table_obj.heads.col.length - 1){
                    draw_line(ctx, vcursor.x + cell_width, vcursor.y, vcursor.x + cell_width - 10, vcursor.y, 4);
                    draw_line(ctx, vcursor.x + cell_width, vcursor.y, vcursor.x + cell_width, vcursor.y + 10, 4);
                    draw_point(ctx, vcursor.x + cell_width, vcursor.y, 4);
                };
                // 左下
                if(cell_index.y < table_obj.heads.row.length - 1){
                    draw_line(ctx, vcursor.x, vcursor.y + cell_height, vcursor.x, vcursor.y + cell_height - 10, 4);
                    draw_line(ctx, vcursor.x, vcursor.y + cell_height, vcursor.x + 10, vcursor.y + cell_height, 4);
                    draw_point(ctx, vcursor.x, vcursor.y + cell_height, 4);
                };
                // 右下
                if(cell_index.x < table_obj.heads.col.length - 1 && cell_index.y < table_obj.heads.row.length - 1){
                    draw_line(ctx, vcursor.x + cell_width, vcursor.y + cell_height, vcursor.x + cell_width, vcursor.y + cell_height - 10, 4);
                    draw_line(ctx, vcursor.x + cell_width, vcursor.y + cell_height, vcursor.x + cell_width - 10, vcursor.y + cell_height, 4);
                    draw_point(ctx, vcursor.x + cell_width, vcursor.y + cell_height, 4);
                };
            };
        } else {


            let find_index = find_it_in_spcell_list(cell_data[2], spcell_list);
            if(cell_data[2] === 'parent' && find_it_in_spcell_list(cell_key, spcell_list) === -1){
                spcell_list.push([cell_key, [cell_key]]);
            } else if (cell_data[2] !== 'parent' && find_index === -1){
                spcell_list.push([cell_data[2], [cell_data[2],cell_key]]);
            } else {
                spcell_list[find_index][1].push(cell_key);
            };
        };
    };
    handle_spcell_list(ctx, table_obj, x, y, is_divider, spcell_list);
};
function find_it_in_spcell_list(cell_key, spcell_list){
    for(let i = 0; i < spcell_list.length; i++){
        if(spcell_list[i][0] === cell_key){
            return i;
        };
    };
    return -1;
};
function handle_spcell_list(ctx, table_obj, x, y, is_divider, spcell_list){ // TODO: 无法使用，需修改
    vcursor = {x:x, y:y};
    for(let spcell_obj of spcell_list){
        let parent_cell = table_obj.cells[spcell_obj[0]];
        let cell_text = parent_cell[0];
        function get_text_size(spcell_cells){
            let top = 1145141919810;
            let left = 1145141919810;
            let bottom = 0;
            let right = 0;
            for(let cell_key of spcell_cells){
                let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
                if(cell_index.y < top){
                    top = cell_index.y;
                };
                if(cell_index.x < left){
                    left = cell_index.x;
                };
                if(cell_index.y > bottom){
                    bottom = cell_index.y;
                };
                if(cell_index.x > right){
                    right = cell_index.x;
                };
            };
            let center_x = Math.round((left + right) / 2);
            let center_y = Math.round((top + bottom) / 2);
            let closest_cell_key = null;
            if(`${center_y}-${center_x}` in spcell_obj[1]){
                closest_cell_key = `${center_y}-${center_x}`;
            } else {
                let min_distance = 1145141919810;
                for(let cell_key of spcell_obj[1]){
                    let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
                    let distance = Math.pow(center_x - cell_index.x, 2) + Math.pow(center_y - cell_index.y, 2);
                    if(distance < min_distance){
                        min_distance = distance;
                        closest_cell_key = cell_key;
                    };
                };
            };
            let closest_cell_index = {x:parseInt(closest_cell_key.split('-')[1], 10), y:parseInt(closest_cell_key.split('-')[0], 10)};
            let text_cells = [];
            let left_index = closest_cell_index.x - 1;
            while(left_index >= 0 && `${closest_cell_index.y}-${left_index}` in spcell_obj[1]){
                text_cells.push(`${closest_cell_index.y}-${left_index}`);
                left_index--;
            };
            let right_index = closest_cell_index.x + 1;
            while(right_index < table_obj.heads.col.length && `${closest_cell_index.y}-${right_index}` in spcell_obj[1]){
                text_cells.push(`${closest_cell_index.y}-${right_index}`);
                right_index++;
            };
            let horizontal_cells = text_cells;
            let top_index = closest_cell_index.y - 1;
            while(top_index >= 0){
                let it_must_includes_when_these_cells_exist = [];
                for(let cell_key of horizontal_cells){
                    let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
                    it_must_includes_when_these_cells_exist.push(`${top_index}-${cell_index.x}`);
                };
                if(it_must_includes_when_these_cells_exist.every(cell_key => cell_key in spcell_obj[1])){
                    text_cells.push(...horizontal_cells);
                    top_index--;
                } else {
                    break;
                };
            };
            let bottom_index = closest_cell_index.y + 1;
            while(bottom_index < table_obj.heads.row.length){
                let it_must_includes_when_these_cells_exist = [];
                for(let cell_key of horizontal_cells){
                    let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
                    it_must_includes_when_these_cells_exist.push(`${bottom_index}-${cell_index.x}`);
                };
                if(it_must_includes_when_these_cells_exist.every(cell_key => cell_key in spcell_obj[1])){
                    text_cells.push(...horizontal_cells);
                    bottom_index++;
                } else {
                    break;
                };
            };
            return text_cells;
        };
        let text_cells = get_text_size(spcell_obj[1]);
        let min_x = 1145141919810;
        let min_y = 1145141919810;
        let max_x = 0;
        let max_y = 0;
        for(let cell_key of text_cells){
            let cell_index = {x:parseInt(cell_key.split('-')[1], 10), y:parseInt(cell_key.split('-')[0], 10)};
            let cell_x = cell_x + get_cell_pos(cell_index.x, table_obj.heads.col);
            let cell_y = cell_y + get_cell_pos(cell_index.y, table_obj.heads.row);
            if(cell_x < min_x){
                min_x = cell_x;
            };
            if(cell_y < min_y){
                min_y = cell_y;
            };
            cell_x = cell_x + get_cell_pos(cell_index.x + 1, table_obj.heads.col);
            cell_y = cell_y + get_cell_pos(cell_index.y + 1, table_obj.heads.row);
            if(cell_x > max_x){
                max_x = cell_x;
            };
            if(cell_y > max_y){
                max_y = cell_y;
            };
        };
        let text_width = max_x - min_x;
        let text_height = max_y - min_y;
        draw_text(ctx, cell_text, min_x, min_y, text_width, text_height);
    };
};