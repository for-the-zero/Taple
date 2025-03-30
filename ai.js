//已执行const ele_aipanel = $('.aipanel');
const ele_ai_url = $('.ai-api-url > input'); // text
const ele_ai_key = $('.ai-api-key > input'); // password
const ele_ai_pmtlang_en = $('.ai-pmt-lang > input[value="en"]#ai-pmt-t-en'); // radio(checked)
const ele_ai_pmtlang_ch = $('.ai-pmt-lang > input[value="ch"]#ai-pmt-t-ch'); // radio
const ele_ai_thinking = $('.ai-pmt-thinking > input'); // checkbox
const ele_ai_inc = $('.ai-pmt-include > input'); // checkbox
const ele_ai_order = $('.ai-order'); // text

const ele_ai_close = $('.ai-btn-close');
const ele_ai_gen = $('.ai-btn-generate');
const ele_ai_apply = $('.ai-btn-apply');

const ele_ai_res = $('.ai-result');

var ai_pmt_lang = 'en';
var ai_pmt_thinking = true;
var ai_pmt_inc = true;

ele_ai_pmtlang_en.on('change',function(){ai_pmt_lang = 'en';});
ele_ai_pmtlang_ch.on('change',function(){ai_pmt_lang = 'ch';});
ele_ai_thinking.on('change',function(){ai_pmt_thinking = this.checked;});
ele_ai_inc.on('change',function(){ai_pmt_inc = this.checked;});
ele_ai_close.on('click',()=>{
    ele_aipanel.removeClass('show');
});

ele_ai_gen.on('click',()=>{
    //TODO:
});

function generate_prompt(){
    let pmt = '';
};

ele_ai_apply.on('click',()=>{}); // TODO:

