if(typeof function_exists === 'undefined') {
    function function_exists(function_name)
    {
        return typeof window[function_name] === 'function';
    }
}

if(! function_exists('newChar') ) {
    function newChar()
    {
        let char = Math.floor(Math.random() * 60) + 63;

        if(char === 63) char = 32;
        else if(char === 64) char = 46;

        return String.fromCharCode(char);
    }
}

if(! function_exists('getPhrase') ) {
    function getPhrase(chars = [])
    {
        return chars.join('');
    }
}

if(! function_exists('map') ) {
    function map(value, min_value, max_value, min_constrained, max_constrained)
    {
        return ((value - min_value) * (max_constrained - min_constrained) / (max_value - min_value)) + min_constrained;
    }
}