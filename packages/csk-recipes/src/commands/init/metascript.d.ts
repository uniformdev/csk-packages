/**
 * @license MetaScript (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 */

declare module '@uniformdev/metascript' {
  export default class MetaScript {
    /**
     * Original source.
     */
    source: string | null;

    /**
     * Original source file name.
     */
    filename: string;

    /**
     * The compiled meta program's source.
     */
    program: string;

    /**
     * Constructs a new MetaScript instance.
     * @param sourceOrProgram - Source to compile or meta program to run.
     * @param filename - Source file name if known, defaults to `"main"`.
     */
    constructor(sourceOrProgram: string, filename?: string);

    /**
     * MetaScript version.
     */
    static VERSION: string;

    /**
     * Compiles the specified source to a meta program and returns its source.
     * @param source - Source code.
     * @returns The compiled meta program.
     */
    static compile(source: string): string;

    /**
     * Compiles the source to a meta program and transforms it using the specified scope in a new VM context.
     * @param source - Source code.
     * @param filename - Source file name (optional).
     * @param scope - Scope object.
     * @returns The transformed source code.
     */
    static transform(source: string, filename: string, scope: object): string;
    static transform(source: string, scope: object): string;

    /**
     * Runs the meta program with the specified scope in the current context and returns the final document.
     * @param scope - Scope object.
     * @returns The transformed source code.
     */
    transform(scope: object): string;
  }
}
