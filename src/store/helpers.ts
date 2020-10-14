import { Action as BaseAction, Reducer } from 'redux';

export type Action<T extends string, P extends Object> = BaseAction<T> & P;

export type ActionCreator<T extends string, P extends object | void = void> = 
    Action<T, P extends object ? (params: Partial<P>) => Action<T, P> : () => Action<T, {}>>;

export function props<P extends object>(defaultProps?: Partial<P>): P {
    return defaultProps || {} as any; // Internal implementation assumes this a partial object, 
                                      // but we want typscript to assume it's a full object in order for correct typings.
}

export function createAction<T extends string>(type: T): ActionCreator<T>;
export function createAction<T extends string, P extends object>(type: T, defaultProps: Partial<P>): ActionCreator<T, P>;

export function createAction<T extends string, P extends object>(type: T, defaultProps?: P): 
    (P extends undefined ? () => Action<T, object> : (parameters: P) => Action<T, P>) & { type: T } {
        defaultProps = defaultProps || {} as any;
        const func = ((params: any = {}) => ({ ...defaultProps, ...params, type })) as any;

        func.type = type;

        return func;
    }

export type ActionType<T extends ActionCreator<string, object>> = ReturnType<T>;

export function createReducer<S>(initial: S, actions: {
    [K in string]: (action: Action<K, any>, state: S) => S
}): Reducer<S> {
    return (state = initial, action) => {
        const reducer = actions[action.type];

        if(reducer)
            return reducer(action, state);

        return state;
    }
}
