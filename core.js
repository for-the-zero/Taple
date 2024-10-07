/*
{
    heads: {
        col: [ // column head
            ['c1',100], // column name, width
            ['c2',200],
            ['c3',150],
        ], 
        row: [
            ['r1',100],
            ['r2',100],
            ['r3',100],
        ],
        colh_height: 70, // column height
        rowh_height: 70
    },
    cells: {
        '0-0': ['cell1',0,0,null], // cell content, column, row
        '0-1': ['cell2',0,1,null],
        '0-2': ['cell3',0,2,null],
        '1-0': ['',1,0,'0-0'], // cell content, column, row, merge with cell
        '1-1': ['cell4',1,1,null],
        '1-2': ['cell5',1,2,null],
        '2-0': ['cell6',2,0,null],
        '2-1': ['cell7',2,1,null],
        '2-2': ['cell8',2,2,null],
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


function taple(ctx, table_obj, x, y, is_divider){
    let vcursor = {x:x, y:y};
    // 画列头
    vcursor.x += table_obj.heads.rowh_height;
    for(let col of table_obj.heads.col){
        draw_text(ctx, col[0], vcursor.x, vcursor.y, col[1], table_obj.heads.colh_height);
        if(table_obj.heads.col.indexOf(col) !== 0 && is_divider){
            draw_line(ctx, vcursor.x, vcursor.y + table_obj.heads.colh_height, vcursor.x, vcursor.y + table_obj.heads.colh_height - 30, 6);
        };
        vcursor.x += col[1];
    };
    // 画列分割线
    vcursor.x = x + table_obj.heads.rowh_height;
    vcursor.y += table_obj.heads.colh_height;
    let total_width = table_obj.heads.col.reduce((acc, cur) => acc + cur[1], 0);
    draw_line(ctx, vcursor.x, vcursor.y, vcursor.x + total_width, vcursor.y, 6);
    // 画行头
    // 画行分割线
    // 画单元格
};