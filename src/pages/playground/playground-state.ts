import { Module } from "@cicada-lang/inet/lib/lang/module"
import { Net } from "@cicada-lang/inet/lib/lang/net"
import { Node } from "@cicada-lang/inet/lib/lang/node"
import { parseStmts } from "@cicada-lang/inet/lib/lang/parser"
import { NetRenderer } from "@cicada-lang/inet/lib/renderers/net-renderer"
import { ParsingError } from "@cicada-lang/sexp/lib/errors"

export class PlaygroundState {
  text = ""
  mod: Module
  _name?: string
  error?: {
    kind: string
    message: string
  }

  constructor() {
    this.mod = load(this.text)
  }

  get names(): Array<string> {
    return this.mod.allNetNames()
  }

  get name(): string | undefined {
    if (this._name && this.names.includes(this._name)) {
      return this._name
    } else {
      return this.names[0]
    }
  }

  set name(name: string | undefined) {
    this._name = name
  }

  catchError(error: unknown): void {
    if (!(error instanceof Error)) throw error
    if (error instanceof ParsingError) {
      this.error = {
        kind: "ParsingError",
        message: error.message + "\n" + error.span.report(this.text),
      }
    } else {
      this.error = {
        kind: error.name,
        message: error.message,
      }
    }
  }

  async refresh(): Promise<void> {
    try {
      delete this.error
      this.mod = load(this.text)
    } catch (error) {
      this.catchError(error)
    }
  }
}

function load(text: string): Module {
  Node.counter = 0
  const url = new URL(window.location.href)
  const mod = new Module(url)
  const stmts = parseStmts(text)
  for (const stmt of stmts) {
    stmt.execute(mod)
  }

  return mod
}
