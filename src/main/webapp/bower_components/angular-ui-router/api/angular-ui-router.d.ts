// Type definitions for Angular JS 1.1.5+ (ui.router module)
// Project: https://github.com/angular-ui/ui-router
// Definitions by: Michel Salib <https://github.com/michelsalib***REMOVED***
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module ng.ui {

    interface IState {
        name?: string;
        template?: string;
        templateUrl?: any; // string || () =***REMOVED*** string
        templateProvider?: any; // () =***REMOVED*** string || IPromise<string***REMOVED***
        controller?: any;
        controllerAs?: string;    
        controllerProvider?: any;
        resolve?: {***REMOVED***;
        url?: string;
        params?: any;
        views?: {***REMOVED***;
        abstract?: boolean;
        onEnter?: (***REMOVED***args: any[]) =***REMOVED*** void;
        onExit?: (***REMOVED***args: any[]) =***REMOVED*** void;
        data?: any;
        reloadOnSearch?: boolean;
    ***REMOVED***

    interface ITypedState<T***REMOVED*** extends IState {
        data?: T;
    ***REMOVED***

    interface IStateProvider extends IServiceProvider {
        state(name: string, config: IState): IStateProvider;
        state(config: IState): IStateProvider;
        decorator(name?: string, decorator?: (state: IState, parent: Function) =***REMOVED*** any): any;
    ***REMOVED***

    interface IUrlMatcher {
        concat(pattern: string): IUrlMatcher;
        exec(path: string, searchParams: {***REMOVED***): {***REMOVED***;
        parameters(): string[];
        format(values: {***REMOVED***): string;
    ***REMOVED***

    interface IUrlMatcherFactory {
        compile(pattern: string): IUrlMatcher;
        isMatcher(o: any): boolean;
    ***REMOVED***

    interface IUrlRouterProvider extends IServiceProvider {
        when(whenPath: RegExp, handler: Function): IUrlRouterProvider;
        when(whenPath: RegExp, handler: any[]): IUrlRouterProvider;
        when(whenPath: RegExp, toPath: string): IUrlRouterProvider;
        when(whenPath: IUrlMatcher, hanlder: Function): IUrlRouterProvider;
        when(whenPath: IUrlMatcher, handler: any[]): IUrlRouterProvider;
        when(whenPath: IUrlMatcher, toPath: string): IUrlRouterProvider;
        when(whenPath: string, handler: Function): IUrlRouterProvider;
        when(whenPath: string, handler: any[]): IUrlRouterProvider;
        when(whenPath: string, toPath: string): IUrlRouterProvider;
        otherwise(handler: Function): IUrlRouterProvider;
        otherwise(handler: any[]): IUrlRouterProvider;
        otherwise(path: string): IUrlRouterProvider;
        rule(handler: Function): IUrlRouterProvider;
        rule(handler: any[]): IUrlRouterProvider;
    ***REMOVED***

    interface IStateOptions {
        location?: any;
        inherit?: boolean;
        relative?: IState;
        notify?: boolean;
        reload?: boolean;
    ***REMOVED***

    interface IHrefOptions {
        lossy?: boolean;
        inherit?: boolean;
        relative?: IState;
        absolute?: boolean;
    ***REMOVED***

    interface IStateService {
        go(to: string, params?: {***REMOVED***, options?: IStateOptions): IPromise<any***REMOVED***;
        transitionTo(state: string, params?: {***REMOVED***, updateLocation?: boolean): void;
        transitionTo(state: string, params?: {***REMOVED***, options?: IStateOptions): void;
        includes(state: string, params?: {***REMOVED***): boolean;
        is(state:string, params?: {***REMOVED***): boolean;
        is(state: IState, params?: {***REMOVED***): boolean;
        href(state: IState, params?: {***REMOVED***, options?: IHrefOptions): string;
        href(state: string, params?: {***REMOVED***, options?: IHrefOptions): string;
        get(state: string): IState;
        get(): IState[];
        current: IState;
        params: any;
        reload(): void;
    ***REMOVED***

    interface IStateParamsService {
        [key: string]: any;
    ***REMOVED***

    interface IStateParams {
        [key: string]: any;
    ***REMOVED***

    interface IUrlRouterService {
        /*
         * Triggers an update; the same update that happens when the address bar
         * url changes, aka $locationChangeSuccess.
         *
         * This method is useful when you need to use preventDefault() on the
         * $locationChangeSuccess event, perform some custom logic (route protection,
         * auth, config, redirection, etc) and then finally proceed with the transition
         * by calling $urlRouter.sync().
         *
         */
        sync(): void;
    ***REMOVED***

    interface IUiViewScrollProvider {
        /*
         * Reverts back to using the core $anchorScroll service for scrolling 
         * based on the url anchor.
         */
        useAnchorScroll(): void;
    ***REMOVED***
***REMOVED***
