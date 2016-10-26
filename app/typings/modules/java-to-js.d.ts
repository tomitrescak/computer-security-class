declare module java2jscompiler {
  interface Map<T> {
    [index: string]: T;
  }

  interface IFile {
    name: string;
    source: string;
  }

  interface ICompiledFile {
    version?: number;
    name?: string;
    source?: string;
    result?: string;
  }

  interface IMessage {
    file?: string;
    line: number;
    column: number;
    message: string;
  }

  interface IDoubleCompilationResult {
    ts?: Map<ICompiledFile>;
    js?: Map<ICompiledFile>;
    errors: IMessage[];
    warnings: IMessage[];
  }

  interface IAsyncCompilationResult {
    files: Map<ICompiledFile>;
    warnings: Map<IMessage[]>;
    errors: Map<IMessage[]>;
  }
}

declare var java2js: {
  initService(files: java2jscompiler.IFile[]): void;
  compile(file: java2jscompiler.IFile, parseOnly?: boolean): java2jscompiler.IDoubleCompilationResult
  compileAsync(files: java2jscompiler.IFile[], cb: (result: java2jscompiler.IAsyncCompilationResult) => void, timeout?: number): void;
};