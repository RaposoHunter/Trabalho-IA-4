if(typeof function_exists === 'undefined') {
    function function_exists(function_name)
    {
        return typeof window[function_name] === 'function';
    }
}

if(! function_exists('map') ) {
    function map(value, min_value, max_value, min_constrained, max_constrained)
    {
        return ((value - min_value) * (max_constrained - min_constrained) / (max_value - min_value)) + min_constrained;
    }
}
