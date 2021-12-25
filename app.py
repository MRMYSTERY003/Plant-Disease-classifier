from flask import Flask, render_template, request, Markup,jsonify
from model import predict_image
import utils
import api_res

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/api',methods = ['POST'])
def api():
    try:
            file = request.files['image']
            # Read the image via file.stream
            img = file.read()
            prediction = predict_image(img)
            print(prediction)
            res = Markup(api_res.disease_dic[prediction])
            print(res)
            return jsonify(str(res))
    except Exception as e:
                print(e)
    return jsonify('server is busy')

    


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        try:
            file = request.files['file']
            img = file.read()
            prediction = predict_image(img)
            print(prediction)
            res = Markup(utils.disease_dic[prediction])
            return render_template('results.html', status=200, result=res)
        except:
            pass
    return render_template('index.html', status=500, res="Internal Server Error")

@app.route('/api/test',methods = ['GET','POST'])
def test():
    return jsonify('test successfull')


@app.route('/weather', methods = ['GET'])
def weather():
    return render_template('weather.html')

@app.route('/pre',methods = ['GET'])
def pre():
    return render_template('server.html')

@app.route('/about',methods = ['GET'])
def about():
    return render_template('about.html')


if __name__ == "__main__":
    app.run(debug=True)
