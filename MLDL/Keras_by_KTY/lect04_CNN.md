mkdate : 2020-05-03-SUN

# 4강. CNN; Convolutional Neural Networks 

## 강의 :  딥러닝 입문에서 활용까지 케라스(Keras) 

##  제공처 : SKplanet Tacademy

## Youtube

-  [4강  Link](https://www.youtube.com/watch?v=f5X0An5KLR4&list=PL9mhQYIlKEheoq-M4EifTMPNWMw7poclK&index=4)

## GithubPages

-  [4강 Link](https://tykimos.github.io/2017/01/27/CNN_Layer_Talk/)
-  [4강  실습 Link](https://tykimos.github.io/2017/03/08/CNN_Getting_Started/)

## 실습 dataset

- [손글씨 이미지](http://tykimos.github.io/warehouse/2017-3-8_CNN_Getting_Started_handwriting_shape.zip)

<br />

---

# CNN; Convolutional Neural Networks

## `keras.layers.convolutionalConv2D`
example)
```python
Conv2D(
            filters, 
            kernel_size, 
            strides=(1, 1), 
            padding='valid', 
            data_format=None, 
            dilation_rate=(1, 1), 
            activation=None, 
            use_bias=True, 
            kernel_initializer='glorot_uniform', 
            bias_initializer='zeros', 
            kernel_regularizer=None, 
            bias_regularizer=None, 
            activity_regularizer=None, 
            kernel_constraint=None, 
            bias_constraint=None, 
            **kwargs)

Conv2D(32, (5,5), padding = 'valid', input_shape=(28,28,1), activation='relu')
```

### Argments
- `filers`
    - number of convolution filters
    - 출력 data  개수와 동일

- `kernel_size` : (rows, cols) of convolutional kernels

*학습 데이터 수 =  `filers` * `kernel rows` * `kernel cols`

- `padding=` : 경계 처리 방법
![https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_4.png](https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_4.png)

    -  `valid` : 유효한 영역만 출력,  따라서 출력 이미지 사이즈는 입력  이미지 사이즈보다 작다
    -  `same` : 출력 이미지 사이즈가 입력 이미지 사이즈와 동일
-  `input_shape=`: sample 수 제외한 입력 형태 정의. 첫 layer에서만 정의하면 됨
    -  `(rows, cols, channels)` : 흑백영상인 경우 channel == 1, RGB인 경우 channel=3

### filter

![https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_1.png](https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_1.png)

- 하나의 filter로 전체 input에 대해 학습
- 지역적인 요소;  어떤 지역에 대해 학습한 내용이 다른 지역에 영향을 미치지 않음
-  Dense layer를 통해서도 구현할 수 있으나,  CNN을 사용하면  훨씬 적은 가중치를 통해서 더 좋은 성능을 만들 수 있음

## `keras.layers.convolutional.MaxPooling2D`

```python
MaxPooling2D(
        pool_size=(2, 2), 
        strides=None, 
        padding='valid', 
        data_format=None, 
        **kwargs)
```
![https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_12.png](https://tykimos.github.io/warehouse/2017-1-27_CNN_Layer_Talk_lego_12.png)

- 각 pixel에서 가장 큰 것만 추출해 이미지 size 축소,  사소한 변화는 무시 (추상화)
- 학습하는 내용은 없음

###  Arguments

- `pool_size=` : (rows, cols)




## `keras.layers.Flatten`

```python
Flatten(
    data_format=None, 
    **kwargs)
```
- 다차원 tensor를 1차원으로 flattening
- 학습하는 내용은 없음

## `ImageDataGenerator` : 데이터 부풀리기

```python
ImageDataGenerator(
        featurewise_center=False, 
        samplewise_center=False, 
        featurewise_std_normalization=False, 
        samplewise_std_normalization=False, 
        zca_whitening=False, 
        zca_epsilon=1e-06, 
        rotation_range=0, 
        width_shift_range=0.0, 
        height_shift_range=0.0, 
        brightness_range=None, 
        shear_range=0.0, 
        zoom_range=0.0, 
        channel_shift_range=0.0, 
        fill_mode='nearest', 
        cval=0.0, 
        horizontal_flip=False, 
        vertical_flip=False, 
        rescale=None, 
        preprocessing_function=None, 
        data_format='channels_last', 
        validation_split=0.0, 
        interpolation_order=1, 
        dtype='float32')
```