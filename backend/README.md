# [MarianMT](https://huggingface.co/docs/transformers/model_doc/marian) Model

## Create and activate [Conda](https://docs.anaconda.com/free/anaconda/install/) Environment
```
# If you do not have anaconda installed download it for your specific OS

conda create --n <my-env> python=3.9.6
conda activate <my-env>
```

## Install [Pytorch](https://pytorch.org/get-started/locally/) and requirements
```
# for Windows and Linux
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia

# for Mac (Cuda is unavailable)
conda install pytorch::pytorch torchvision torchaudio -c pytorch

# download requirements
conda install -r requirements.txt
```

## Run and test Model
```
# run model
python marian_model.py

# test model in new terminal using curl (Replace localhost with IP if not run locally)

curl -X POST -H "Content-Type: application/json" -d '{"src_text":"This is a test sentence","src_lang":"en","tgt_lang":"fr"}' http://localhost:5000/translate
```
