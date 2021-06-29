import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const [state, setState] = useState({ data: null, loading: true, error: null });

    const isMounted = useRef(true);

    useEffect(() => {
        // effect lo que quiero que haga
        return () => {
            //cleanup el return solo se ejecuta cuando se desmonta el componente
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }
            })
            .catch( () => {
                setState({
                    data: null, 
                    loading: false, 
                    error: 'No se pudo cargar la info'
                })
            })

    }, [url]);

    return state;

}
