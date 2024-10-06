/*
{
    heads: {
        col: [ // column head
            ['c1',100], // column name, width
            ['c2',20],
            ['c3',150],
        ], 
        row: [
            ['r1',100],
            ['r2',100],
            ['r3',100],
        ],
        colh_height: 100, // column height
        rowh_height: 100
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
            let lines_height = line_height * text_lines.length;
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
        ctx.textBaseline = 'top';
        for(let i = 0; i < text_lines.length; i++){
            ctx.fillText(text_lines[i], x, y + i * line_height);
        };
    };
};
function taple(ctx, table_obj, x, y, is_divider){
    let vcursor = {x:x, y:y};
    // draw column head
    vcursor.x += table_obj.heads.rowh_height;
    //TODO:
    // draw row head
    // draw cells
};