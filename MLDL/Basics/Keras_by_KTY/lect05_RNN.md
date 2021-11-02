mkdate : 2020-05-03-SUN

# 5강. RNN;  Recurrent Neural Networks 

## 강의 :  딥러닝 입문에서 활용까지 케라스(Keras) 

##  제공처 : SKplanet Tacademy

## Youtube

-  [5강  Link](https://www.youtube.com/watch?v=-D2SKSlkfX8&list=PL9mhQYIlKEheoq-M4EifTMPNWMw7poclK&index=5)

## GithubPages

-  [5강 Link](https://tykimos.github.io/2017/04/09/RNN_Getting_Started/)
-  [5강  실습 Link](https://tykimos.github.io/2017/04/09/RNN_Layer_Talk/)


<br />

---



# `keras.layers.LSTM`

```python
LSTM(
        units, 
        activation='tanh', 
        recurrent_activation='sigmoid', 
        use_bias=True, 
        kernel_initializer='glorot_uniform', 
        recurrent_initializer='orthogonal', 
        bias_initializer='zeros', 
        unit_forget_bias=True, 
        kernel_regularizer=None, 
        recurrent_regularizer=None, 
        bias_regularizer=None, 
        activity_regularizer=None, 
        kernel_constraint=None, 
        recurrent_constraint=None, 
        bias_constraint=None, 
        dropout=0.0, 
        recurrent_dropout=0.0, 
        implementation=2, 
        return_sequences=False, 
        return_state=False, 
        go_backwards=False, 
        stateful=False, 
        unroll=False, 
        **kwargs)
```

## Arguments

- `units` : number of output data
- `input_dim=`
- `input_length=`
- `return_sequences=`
- `stateful=` : 상태 유지 여부

