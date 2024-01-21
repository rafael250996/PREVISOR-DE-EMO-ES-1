$(document).ready(function(){

    console.log('O Documento está Pronto')

    //  obtendo a data usando o objeto Date () e convertendo-a em uma string
    let date = new Date()
    let current_date = date.toDateString()

   // Exibindo a data na página HTML usando jQuery e JS
$('#date').text('Data: ' + current_date);


    
    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    //  criando uma função para a requisição AJAX
    function ajax_request(api_url, input_data, request_type) {
        $.ajax({
            // tipo da requisição
            type: request_type,
    
            // url
            url: api_url,
    
            // dados JSON
            data: JSON.stringify(input_data),
    
            // tipo de dado da resposta esperada
            dataType: 'json',
    
            // tipo de conteúdo
            contentType: 'application/json',
    
            // método success
            success: function (result) {
                // extraia o sentimento e o caminho do emoji
                emotion = result.sentiment;
                emoji_url = result.path;
    
                // atualize o emoticon e o sentimento apropriadamente
                if (product == 'Smartphone') {
                    $('#m_emoji').attr('src', emoji_url);
                    $('#m_emotion').text(emotion);
                    $('#m_emoji').show();
                    $('#m_emotion').show();
                } else if (product == 'Digital Camera') {
                    $('#c_emoji').attr('src', emoji_url);
                    $('#c_emotion').text(emotion);
                    $('#c_emoji').show();
                    $('#c_emotion').show();
                } else if (product == 'Headphones') {
                    $('#h_emoji').attr('src', emoji_url);
                    $('#h_emotion').text(emotion);
                    $('#h_emoji').show();
                    $('#h_emotion').show();
                } else if (product == 'Video Games') {
                    $('#v_emoji').attr('src', emoji_url);
                    $('#v_emotion').text(emotion);
                    $('#v_emoji').show();
                    $('#v_emotion').show();
                }
            },
    
            // método error
            error: function (result) {
                console.log(result);
            },
        });
    
        console.log('requisição ajax enviada');
    }
    


    //  verifique se o botão Enviar em 'smartphone' foi clicado e obtenha a avaliação apropriada
    $('#m_button').click(function(){

        review = $('#m_textbox').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Smartphone'
    })

    //  verifique se o botão Enviar em 'camera' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Digital Camera'
    })

    //  verifique se o botão Enviar em 'headphones' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Headphones'
    })

    //  verifique se o botão Enviar em 'videogame' foi clicado e obtenha a avaliação apropriada
    $('').click(function(){

        review = $('').val()
        input_data = {'customer_review' : review}
        ajax_request('/predict' , input_data)

        product = 'Video Games'
    })


    //  se o botão SALVAR for clicado, dispare uma requisição POST na API

    $('').click(function(){

        console.log('botão salvar foi clicado')

        //  entrada de dados 
        input_data = {'date' : date , 'product' : product , 'review' : review , 'sentiment' : emotion}

        //  chamada ajax
        $.ajax({
            type : '',
            url : '',
            data : JSON.stringify(input_data),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                console.log(result)
            },
            error : function(result){
                console.log(result)
            }
        })

        // limpando as caixas de texto
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })


})

    
