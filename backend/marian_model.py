from flask import Flask, request, jsonify
from transformers import MarianMTModel, MarianTokenizer
from langdetect import detect

app = Flask(__name__)

def translate(src_text, src, tgt):
    # sets up the model and tokenizer
    model_name = "Helsinki-NLP/opus-mt-" + src + "-" + tgt
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    # print(tokenizer.supported_language_codes)
    model = MarianMTModel.from_pretrained(model_name)

    # tokenizes the input text (encoder)
    translated = model.generate(**tokenizer(src_text, return_tensors="pt", padding=True))

    # decodes tokens into translated text (decoder)
    translation = [tokenizer.decode(t, skip_special_tokens=True) for t in translated]

    return translation

@app.route('/translate', methods=['POST'])
def handle_translation():
    # get input data from react native
    request_data = request.json
    src_text = request_data.get('src_text', '')
    # if no input default is english
    src_lang = detect(src_text) 
    print(src_lang)
    tgt_lang = request_data.get('tgt_lang', 'en') 

    # runs translated function and returns the translated text
    if src_lang != tgt_lang:
        translated = translate(src_text, src_lang, tgt_lang)
    else:
        translated = src_text

    return jsonify({'translation': translated})

if __name__ == "__main__": 
    app.run(debug=True)
    # for testing model
    # src_lang = "en"
    # tgt_lang = "fr"
    # src_text = input("Input Text: ")
    # translated = translate(src_text, src_lang, tgt_lang)
    # for t in translated:
    #     print(t)
