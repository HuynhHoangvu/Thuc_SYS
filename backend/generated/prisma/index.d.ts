
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Column
 * 
 */
export type Column = $Result.DefaultSelection<Prisma.$ColumnPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model DocFolder
 * 
 */
export type DocFolder = $Result.DefaultSelection<Prisma.$DocFolderPayload>
/**
 * Model DocFile
 * 
 */
export type DocFile = $Result.DefaultSelection<Prisma.$DocFilePayload>
/**
 * Model ProcessedFolder
 * 
 */
export type ProcessedFolder = $Result.DefaultSelection<Prisma.$ProcessedFolderPayload>
/**
 * Model ProcessedFile
 * 
 */
export type ProcessedFile = $Result.DefaultSelection<Prisma.$ProcessedFilePayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Columns
 * const columns = await prisma.column.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Columns
   * const columns = await prisma.column.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.column`: Exposes CRUD operations for the **Column** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Columns
    * const columns = await prisma.column.findMany()
    * ```
    */
  get column(): Prisma.ColumnDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.docFolder`: Exposes CRUD operations for the **DocFolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocFolders
    * const docFolders = await prisma.docFolder.findMany()
    * ```
    */
  get docFolder(): Prisma.DocFolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.docFile`: Exposes CRUD operations for the **DocFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocFiles
    * const docFiles = await prisma.docFile.findMany()
    * ```
    */
  get docFile(): Prisma.DocFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processedFolder`: Exposes CRUD operations for the **ProcessedFolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedFolders
    * const processedFolders = await prisma.processedFolder.findMany()
    * ```
    */
  get processedFolder(): Prisma.ProcessedFolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processedFile`: Exposes CRUD operations for the **ProcessedFile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedFiles
    * const processedFiles = await prisma.processedFile.findMany()
    * ```
    */
  get processedFile(): Prisma.ProcessedFileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Column: 'Column',
    Task: 'Task',
    Activity: 'Activity',
    DocFolder: 'DocFolder',
    DocFile: 'DocFile',
    ProcessedFolder: 'ProcessedFolder',
    ProcessedFile: 'ProcessedFile',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "column" | "task" | "activity" | "docFolder" | "docFile" | "processedFolder" | "processedFile" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Column: {
        payload: Prisma.$ColumnPayload<ExtArgs>
        fields: Prisma.ColumnFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ColumnFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ColumnFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findFirst: {
            args: Prisma.ColumnFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ColumnFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          findMany: {
            args: Prisma.ColumnFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          create: {
            args: Prisma.ColumnCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          createMany: {
            args: Prisma.ColumnCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ColumnCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          delete: {
            args: Prisma.ColumnDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          update: {
            args: Prisma.ColumnUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          deleteMany: {
            args: Prisma.ColumnDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ColumnUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ColumnUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>[]
          }
          upsert: {
            args: Prisma.ColumnUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ColumnPayload>
          }
          aggregate: {
            args: Prisma.ColumnAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateColumn>
          }
          groupBy: {
            args: Prisma.ColumnGroupByArgs<ExtArgs>
            result: $Utils.Optional<ColumnGroupByOutputType>[]
          }
          count: {
            args: Prisma.ColumnCountArgs<ExtArgs>
            result: $Utils.Optional<ColumnCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      DocFolder: {
        payload: Prisma.$DocFolderPayload<ExtArgs>
        fields: Prisma.DocFolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocFolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocFolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          findFirst: {
            args: Prisma.DocFolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocFolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          findMany: {
            args: Prisma.DocFolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>[]
          }
          create: {
            args: Prisma.DocFolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          createMany: {
            args: Prisma.DocFolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocFolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>[]
          }
          delete: {
            args: Prisma.DocFolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          update: {
            args: Prisma.DocFolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          deleteMany: {
            args: Prisma.DocFolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocFolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocFolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>[]
          }
          upsert: {
            args: Prisma.DocFolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFolderPayload>
          }
          aggregate: {
            args: Prisma.DocFolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocFolder>
          }
          groupBy: {
            args: Prisma.DocFolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocFolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocFolderCountArgs<ExtArgs>
            result: $Utils.Optional<DocFolderCountAggregateOutputType> | number
          }
        }
      }
      DocFile: {
        payload: Prisma.$DocFilePayload<ExtArgs>
        fields: Prisma.DocFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          findFirst: {
            args: Prisma.DocFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          findMany: {
            args: Prisma.DocFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>[]
          }
          create: {
            args: Prisma.DocFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          createMany: {
            args: Prisma.DocFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>[]
          }
          delete: {
            args: Prisma.DocFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          update: {
            args: Prisma.DocFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          deleteMany: {
            args: Prisma.DocFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>[]
          }
          upsert: {
            args: Prisma.DocFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocFilePayload>
          }
          aggregate: {
            args: Prisma.DocFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocFile>
          }
          groupBy: {
            args: Prisma.DocFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocFileCountArgs<ExtArgs>
            result: $Utils.Optional<DocFileCountAggregateOutputType> | number
          }
        }
      }
      ProcessedFolder: {
        payload: Prisma.$ProcessedFolderPayload<ExtArgs>
        fields: Prisma.ProcessedFolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedFolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedFolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          findFirst: {
            args: Prisma.ProcessedFolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedFolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          findMany: {
            args: Prisma.ProcessedFolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>[]
          }
          create: {
            args: Prisma.ProcessedFolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          createMany: {
            args: Prisma.ProcessedFolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedFolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>[]
          }
          delete: {
            args: Prisma.ProcessedFolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          update: {
            args: Prisma.ProcessedFolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedFolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedFolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedFolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedFolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFolderPayload>
          }
          aggregate: {
            args: Prisma.ProcessedFolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedFolder>
          }
          groupBy: {
            args: Prisma.ProcessedFolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedFolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedFolderCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedFolderCountAggregateOutputType> | number
          }
        }
      }
      ProcessedFile: {
        payload: Prisma.$ProcessedFilePayload<ExtArgs>
        fields: Prisma.ProcessedFileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedFileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedFileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          findFirst: {
            args: Prisma.ProcessedFileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedFileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          findMany: {
            args: Prisma.ProcessedFileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>[]
          }
          create: {
            args: Prisma.ProcessedFileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          createMany: {
            args: Prisma.ProcessedFileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedFileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>[]
          }
          delete: {
            args: Prisma.ProcessedFileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          update: {
            args: Prisma.ProcessedFileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          deleteMany: {
            args: Prisma.ProcessedFileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedFileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedFileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>[]
          }
          upsert: {
            args: Prisma.ProcessedFileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedFilePayload>
          }
          aggregate: {
            args: Prisma.ProcessedFileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedFile>
          }
          groupBy: {
            args: Prisma.ProcessedFileGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedFileGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedFileCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedFileCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    column?: ColumnOmit
    task?: TaskOmit
    activity?: ActivityOmit
    docFolder?: DocFolderOmit
    docFile?: DocFileOmit
    processedFolder?: ProcessedFolderOmit
    processedFile?: ProcessedFileOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ColumnCountOutputType
   */

  export type ColumnCountOutputType = {
    tasks: number
  }

  export type ColumnCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | ColumnCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ColumnCountOutputType
     */
    select?: ColumnCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ColumnCountOutputType without action
   */
  export type ColumnCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    activities: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | TaskCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }


  /**
   * Count Type DocFolderCountOutputType
   */

  export type DocFolderCountOutputType = {
    files: number
  }

  export type DocFolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | DocFolderCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * DocFolderCountOutputType without action
   */
  export type DocFolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolderCountOutputType
     */
    select?: DocFolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocFolderCountOutputType without action
   */
  export type DocFolderCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocFileWhereInput
  }


  /**
   * Count Type ProcessedFolderCountOutputType
   */

  export type ProcessedFolderCountOutputType = {
    files: number
  }

  export type ProcessedFolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | ProcessedFolderCountOutputTypeCountFilesArgs
  }

  // Custom InputTypes
  /**
   * ProcessedFolderCountOutputType without action
   */
  export type ProcessedFolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolderCountOutputType
     */
    select?: ProcessedFolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProcessedFolderCountOutputType without action
   */
  export type ProcessedFolderCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedFileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Column
   */

  export type AggregateColumn = {
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  export type ColumnAvgAggregateOutputType = {
    order: number | null
  }

  export type ColumnSumAggregateOutputType = {
    order: number | null
  }

  export type ColumnMinAggregateOutputType = {
    id: string | null
    title: string | null
    order: number | null
  }

  export type ColumnMaxAggregateOutputType = {
    id: string | null
    title: string | null
    order: number | null
  }

  export type ColumnCountAggregateOutputType = {
    id: number
    title: number
    order: number
    _all: number
  }


  export type ColumnAvgAggregateInputType = {
    order?: true
  }

  export type ColumnSumAggregateInputType = {
    order?: true
  }

  export type ColumnMinAggregateInputType = {
    id?: true
    title?: true
    order?: true
  }

  export type ColumnMaxAggregateInputType = {
    id?: true
    title?: true
    order?: true
  }

  export type ColumnCountAggregateInputType = {
    id?: true
    title?: true
    order?: true
    _all?: true
  }

  export type ColumnAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Column to aggregate.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Columns
    **/
    _count?: true | ColumnCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ColumnAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ColumnSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ColumnMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ColumnMaxAggregateInputType
  }

  export type GetColumnAggregateType<T extends ColumnAggregateArgs> = {
        [P in keyof T & keyof AggregateColumn]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateColumn[P]>
      : GetScalarType<T[P], AggregateColumn[P]>
  }




  export type ColumnGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ColumnWhereInput
    orderBy?: ColumnOrderByWithAggregationInput | ColumnOrderByWithAggregationInput[]
    by: ColumnScalarFieldEnum[] | ColumnScalarFieldEnum
    having?: ColumnScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ColumnCountAggregateInputType | true
    _avg?: ColumnAvgAggregateInputType
    _sum?: ColumnSumAggregateInputType
    _min?: ColumnMinAggregateInputType
    _max?: ColumnMaxAggregateInputType
  }

  export type ColumnGroupByOutputType = {
    id: string
    title: string
    order: number
    _count: ColumnCountAggregateOutputType | null
    _avg: ColumnAvgAggregateOutputType | null
    _sum: ColumnSumAggregateOutputType | null
    _min: ColumnMinAggregateOutputType | null
    _max: ColumnMaxAggregateOutputType | null
  }

  type GetColumnGroupByPayload<T extends ColumnGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ColumnGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ColumnGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ColumnGroupByOutputType[P]>
            : GetScalarType<T[P], ColumnGroupByOutputType[P]>
        }
      >
    >


  export type ColumnSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    order?: boolean
    tasks?: boolean | Column$tasksArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    order?: boolean
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    order?: boolean
  }, ExtArgs["result"]["column"]>

  export type ColumnSelectScalar = {
    id?: boolean
    title?: boolean
    order?: boolean
  }

  export type ColumnOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "order", ExtArgs["result"]["column"]>
  export type ColumnInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tasks?: boolean | Column$tasksArgs<ExtArgs>
    _count?: boolean | ColumnCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ColumnIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ColumnIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ColumnPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Column"
    objects: {
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      order: number
    }, ExtArgs["result"]["column"]>
    composites: {}
  }

  type ColumnGetPayload<S extends boolean | null | undefined | ColumnDefaultArgs> = $Result.GetResult<Prisma.$ColumnPayload, S>

  type ColumnCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ColumnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ColumnCountAggregateInputType | true
    }

  export interface ColumnDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Column'], meta: { name: 'Column' } }
    /**
     * Find zero or one Column that matches the filter.
     * @param {ColumnFindUniqueArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ColumnFindUniqueArgs>(args: SelectSubset<T, ColumnFindUniqueArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Column that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ColumnFindUniqueOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ColumnFindUniqueOrThrowArgs>(args: SelectSubset<T, ColumnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ColumnFindFirstArgs>(args?: SelectSubset<T, ColumnFindFirstArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Column that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindFirstOrThrowArgs} args - Arguments to find a Column
     * @example
     * // Get one Column
     * const column = await prisma.column.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ColumnFindFirstOrThrowArgs>(args?: SelectSubset<T, ColumnFindFirstOrThrowArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Columns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Columns
     * const columns = await prisma.column.findMany()
     * 
     * // Get first 10 Columns
     * const columns = await prisma.column.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const columnWithIdOnly = await prisma.column.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ColumnFindManyArgs>(args?: SelectSubset<T, ColumnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Column.
     * @param {ColumnCreateArgs} args - Arguments to create a Column.
     * @example
     * // Create one Column
     * const Column = await prisma.column.create({
     *   data: {
     *     // ... data to create a Column
     *   }
     * })
     * 
     */
    create<T extends ColumnCreateArgs>(args: SelectSubset<T, ColumnCreateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Columns.
     * @param {ColumnCreateManyArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ColumnCreateManyArgs>(args?: SelectSubset<T, ColumnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Columns and returns the data saved in the database.
     * @param {ColumnCreateManyAndReturnArgs} args - Arguments to create many Columns.
     * @example
     * // Create many Columns
     * const column = await prisma.column.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ColumnCreateManyAndReturnArgs>(args?: SelectSubset<T, ColumnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Column.
     * @param {ColumnDeleteArgs} args - Arguments to delete one Column.
     * @example
     * // Delete one Column
     * const Column = await prisma.column.delete({
     *   where: {
     *     // ... filter to delete one Column
     *   }
     * })
     * 
     */
    delete<T extends ColumnDeleteArgs>(args: SelectSubset<T, ColumnDeleteArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Column.
     * @param {ColumnUpdateArgs} args - Arguments to update one Column.
     * @example
     * // Update one Column
     * const column = await prisma.column.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ColumnUpdateArgs>(args: SelectSubset<T, ColumnUpdateArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Columns.
     * @param {ColumnDeleteManyArgs} args - Arguments to filter Columns to delete.
     * @example
     * // Delete a few Columns
     * const { count } = await prisma.column.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ColumnDeleteManyArgs>(args?: SelectSubset<T, ColumnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ColumnUpdateManyArgs>(args: SelectSubset<T, ColumnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Columns and returns the data updated in the database.
     * @param {ColumnUpdateManyAndReturnArgs} args - Arguments to update many Columns.
     * @example
     * // Update many Columns
     * const column = await prisma.column.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Columns and only return the `id`
     * const columnWithIdOnly = await prisma.column.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ColumnUpdateManyAndReturnArgs>(args: SelectSubset<T, ColumnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Column.
     * @param {ColumnUpsertArgs} args - Arguments to update or create a Column.
     * @example
     * // Update or create a Column
     * const column = await prisma.column.upsert({
     *   create: {
     *     // ... data to create a Column
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Column we want to update
     *   }
     * })
     */
    upsert<T extends ColumnUpsertArgs>(args: SelectSubset<T, ColumnUpsertArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Columns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnCountArgs} args - Arguments to filter Columns to count.
     * @example
     * // Count the number of Columns
     * const count = await prisma.column.count({
     *   where: {
     *     // ... the filter for the Columns we want to count
     *   }
     * })
    **/
    count<T extends ColumnCountArgs>(
      args?: Subset<T, ColumnCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ColumnCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ColumnAggregateArgs>(args: Subset<T, ColumnAggregateArgs>): Prisma.PrismaPromise<GetColumnAggregateType<T>>

    /**
     * Group by Column.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ColumnGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ColumnGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ColumnGroupByArgs['orderBy'] }
        : { orderBy?: ColumnGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ColumnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Column model
   */
  readonly fields: ColumnFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Column.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ColumnClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tasks<T extends Column$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Column$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Column model
   */
  interface ColumnFieldRefs {
    readonly id: FieldRef<"Column", 'String'>
    readonly title: FieldRef<"Column", 'String'>
    readonly order: FieldRef<"Column", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Column findUnique
   */
  export type ColumnFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findUniqueOrThrow
   */
  export type ColumnFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column findFirst
   */
  export type ColumnFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findFirstOrThrow
   */
  export type ColumnFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Column to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column findMany
   */
  export type ColumnFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter, which Columns to fetch.
     */
    where?: ColumnWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Columns to fetch.
     */
    orderBy?: ColumnOrderByWithRelationInput | ColumnOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Columns.
     */
    cursor?: ColumnWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Columns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Columns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Columns.
     */
    distinct?: ColumnScalarFieldEnum | ColumnScalarFieldEnum[]
  }

  /**
   * Column create
   */
  export type ColumnCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to create a Column.
     */
    data: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
  }

  /**
   * Column createMany
   */
  export type ColumnCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Column createManyAndReturn
   */
  export type ColumnCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to create many Columns.
     */
    data: ColumnCreateManyInput | ColumnCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Column update
   */
  export type ColumnUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The data needed to update a Column.
     */
    data: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
    /**
     * Choose, which Column to update.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column updateMany
   */
  export type ColumnUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
  }

  /**
   * Column updateManyAndReturn
   */
  export type ColumnUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * The data used to update Columns.
     */
    data: XOR<ColumnUpdateManyMutationInput, ColumnUncheckedUpdateManyInput>
    /**
     * Filter which Columns to update
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to update.
     */
    limit?: number
  }

  /**
   * Column upsert
   */
  export type ColumnUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * The filter to search for the Column to update in case it exists.
     */
    where: ColumnWhereUniqueInput
    /**
     * In case the Column found by the `where` argument doesn't exist, create a new Column with this data.
     */
    create: XOR<ColumnCreateInput, ColumnUncheckedCreateInput>
    /**
     * In case the Column was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ColumnUpdateInput, ColumnUncheckedUpdateInput>
  }

  /**
   * Column delete
   */
  export type ColumnDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    /**
     * Filter which Column to delete.
     */
    where: ColumnWhereUniqueInput
  }

  /**
   * Column deleteMany
   */
  export type ColumnDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Columns to delete
     */
    where?: ColumnWhereInput
    /**
     * Limit how many Columns to delete.
     */
    limit?: number
  }

  /**
   * Column.tasks
   */
  export type Column$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Column without action
   */
  export type ColumnDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    dependents: number | null
  }

  export type TaskSumAggregateOutputType = {
    dependents: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    content: string | null
    price: string | null
    phone: string | null
    email: string | null
    description: string | null
    source: string | null
    assignedTo: string | null
    visaType: string | null
    passportNumber: string | null
    maritalStatus: string | null
    dependents: number | null
    priorityDate: string | null
    educationLevel: string | null
    englishScore: string | null
    workExperience: string | null
    jobType: string | null
    checklistType: string | null
    columnId: string | null
    createdAt: Date | null
    processingColId: string | null
    commissionPaid: boolean | null
    recruitmentStep: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    content: string | null
    price: string | null
    phone: string | null
    email: string | null
    description: string | null
    source: string | null
    assignedTo: string | null
    visaType: string | null
    passportNumber: string | null
    maritalStatus: string | null
    dependents: number | null
    priorityDate: string | null
    educationLevel: string | null
    englishScore: string | null
    workExperience: string | null
    jobType: string | null
    checklistType: string | null
    columnId: string | null
    createdAt: Date | null
    processingColId: string | null
    commissionPaid: boolean | null
    recruitmentStep: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    content: number
    price: number
    phone: number
    email: number
    description: number
    source: number
    assignedTo: number
    visaType: number
    passportNumber: number
    maritalStatus: number
    dependents: number
    priorityDate: number
    educationLevel: number
    englishScore: number
    workExperience: number
    jobType: number
    checklistType: number
    columnId: number
    createdAt: number
    documents: number
    processingColId: number
    commissionPaid: number
    recruitmentStep: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    dependents?: true
  }

  export type TaskSumAggregateInputType = {
    dependents?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    content?: true
    price?: true
    phone?: true
    email?: true
    description?: true
    source?: true
    assignedTo?: true
    visaType?: true
    passportNumber?: true
    maritalStatus?: true
    dependents?: true
    priorityDate?: true
    educationLevel?: true
    englishScore?: true
    workExperience?: true
    jobType?: true
    checklistType?: true
    columnId?: true
    createdAt?: true
    processingColId?: true
    commissionPaid?: true
    recruitmentStep?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    content?: true
    price?: true
    phone?: true
    email?: true
    description?: true
    source?: true
    assignedTo?: true
    visaType?: true
    passportNumber?: true
    maritalStatus?: true
    dependents?: true
    priorityDate?: true
    educationLevel?: true
    englishScore?: true
    workExperience?: true
    jobType?: true
    checklistType?: true
    columnId?: true
    createdAt?: true
    processingColId?: true
    commissionPaid?: true
    recruitmentStep?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    content?: true
    price?: true
    phone?: true
    email?: true
    description?: true
    source?: true
    assignedTo?: true
    visaType?: true
    passportNumber?: true
    maritalStatus?: true
    dependents?: true
    priorityDate?: true
    educationLevel?: true
    englishScore?: true
    workExperience?: true
    jobType?: true
    checklistType?: true
    columnId?: true
    createdAt?: true
    documents?: true
    processingColId?: true
    commissionPaid?: true
    recruitmentStep?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    content: string
    price: string
    phone: string
    email: string | null
    description: string | null
    source: string | null
    assignedTo: string
    visaType: string | null
    passportNumber: string | null
    maritalStatus: string | null
    dependents: number | null
    priorityDate: string | null
    educationLevel: string | null
    englishScore: string | null
    workExperience: string | null
    jobType: string | null
    checklistType: string | null
    columnId: string | null
    createdAt: Date
    documents: JsonValue | null
    processingColId: string
    commissionPaid: boolean
    recruitmentStep: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    price?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    source?: boolean
    assignedTo?: boolean
    visaType?: boolean
    passportNumber?: boolean
    maritalStatus?: boolean
    dependents?: boolean
    priorityDate?: boolean
    educationLevel?: boolean
    englishScore?: boolean
    workExperience?: boolean
    jobType?: boolean
    checklistType?: boolean
    columnId?: boolean
    createdAt?: boolean
    documents?: boolean
    processingColId?: boolean
    commissionPaid?: boolean
    recruitmentStep?: boolean
    column?: boolean | Task$columnArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    price?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    source?: boolean
    assignedTo?: boolean
    visaType?: boolean
    passportNumber?: boolean
    maritalStatus?: boolean
    dependents?: boolean
    priorityDate?: boolean
    educationLevel?: boolean
    englishScore?: boolean
    workExperience?: boolean
    jobType?: boolean
    checklistType?: boolean
    columnId?: boolean
    createdAt?: boolean
    documents?: boolean
    processingColId?: boolean
    commissionPaid?: boolean
    recruitmentStep?: boolean
    column?: boolean | Task$columnArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    price?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    source?: boolean
    assignedTo?: boolean
    visaType?: boolean
    passportNumber?: boolean
    maritalStatus?: boolean
    dependents?: boolean
    priorityDate?: boolean
    educationLevel?: boolean
    englishScore?: boolean
    workExperience?: boolean
    jobType?: boolean
    checklistType?: boolean
    columnId?: boolean
    createdAt?: boolean
    documents?: boolean
    processingColId?: boolean
    commissionPaid?: boolean
    recruitmentStep?: boolean
    column?: boolean | Task$columnArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    content?: boolean
    price?: boolean
    phone?: boolean
    email?: boolean
    description?: boolean
    source?: boolean
    assignedTo?: boolean
    visaType?: boolean
    passportNumber?: boolean
    maritalStatus?: boolean
    dependents?: boolean
    priorityDate?: boolean
    educationLevel?: boolean
    englishScore?: boolean
    workExperience?: boolean
    jobType?: boolean
    checklistType?: boolean
    columnId?: boolean
    createdAt?: boolean
    documents?: boolean
    processingColId?: boolean
    commissionPaid?: boolean
    recruitmentStep?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "price" | "phone" | "email" | "description" | "source" | "assignedTo" | "visaType" | "passportNumber" | "maritalStatus" | "dependents" | "priorityDate" | "educationLevel" | "englishScore" | "workExperience" | "jobType" | "checklistType" | "columnId" | "createdAt" | "documents" | "processingColId" | "commissionPaid" | "recruitmentStep", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    column?: boolean | Task$columnArgs<ExtArgs>
    activities?: boolean | Task$activitiesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    column?: boolean | Task$columnArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    column?: boolean | Task$columnArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      column: Prisma.$ColumnPayload<ExtArgs> | null
      activities: Prisma.$ActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      price: string
      phone: string
      email: string | null
      description: string | null
      source: string | null
      assignedTo: string
      visaType: string | null
      passportNumber: string | null
      maritalStatus: string | null
      dependents: number | null
      priorityDate: string | null
      educationLevel: string | null
      englishScore: string | null
      workExperience: string | null
      jobType: string | null
      checklistType: string | null
      columnId: string | null
      createdAt: Date
      documents: Prisma.JsonValue | null
      processingColId: string
      commissionPaid: boolean
      recruitmentStep: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    column<T extends Task$columnArgs<ExtArgs> = {}>(args?: Subset<T, Task$columnArgs<ExtArgs>>): Prisma__ColumnClient<$Result.GetResult<Prisma.$ColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    activities<T extends Task$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, Task$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly content: FieldRef<"Task", 'String'>
    readonly price: FieldRef<"Task", 'String'>
    readonly phone: FieldRef<"Task", 'String'>
    readonly email: FieldRef<"Task", 'String'>
    readonly description: FieldRef<"Task", 'String'>
    readonly source: FieldRef<"Task", 'String'>
    readonly assignedTo: FieldRef<"Task", 'String'>
    readonly visaType: FieldRef<"Task", 'String'>
    readonly passportNumber: FieldRef<"Task", 'String'>
    readonly maritalStatus: FieldRef<"Task", 'String'>
    readonly dependents: FieldRef<"Task", 'Int'>
    readonly priorityDate: FieldRef<"Task", 'String'>
    readonly educationLevel: FieldRef<"Task", 'String'>
    readonly englishScore: FieldRef<"Task", 'String'>
    readonly workExperience: FieldRef<"Task", 'String'>
    readonly jobType: FieldRef<"Task", 'String'>
    readonly checklistType: FieldRef<"Task", 'String'>
    readonly columnId: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly documents: FieldRef<"Task", 'Json'>
    readonly processingColId: FieldRef<"Task", 'String'>
    readonly commissionPaid: FieldRef<"Task", 'Boolean'>
    readonly recruitmentStep: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.column
   */
  export type Task$columnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Column
     */
    select?: ColumnSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Column
     */
    omit?: ColumnOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ColumnInclude<ExtArgs> | null
    where?: ColumnWhereInput
  }

  /**
   * Task.activities
   */
  export type Task$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    completed: boolean | null
    type: string | null
    summary: string | null
    assignee: string | null
    status: string | null
    fileName: string | null
    fileUrl: string | null
    dueText: string | null
    createdAt: Date | null
    jobType: string | null
    taskId: string | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    completed: boolean | null
    type: string | null
    summary: string | null
    assignee: string | null
    status: string | null
    fileName: string | null
    fileUrl: string | null
    dueText: string | null
    createdAt: Date | null
    jobType: string | null
    taskId: string | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    completed: number
    type: number
    summary: number
    assignee: number
    status: number
    fileName: number
    fileUrl: number
    dueText: number
    createdAt: number
    jobType: number
    taskId: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    completed?: true
    type?: true
    summary?: true
    assignee?: true
    status?: true
    fileName?: true
    fileUrl?: true
    dueText?: true
    createdAt?: true
    jobType?: true
    taskId?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    completed?: true
    type?: true
    summary?: true
    assignee?: true
    status?: true
    fileName?: true
    fileUrl?: true
    dueText?: true
    createdAt?: true
    jobType?: true
    taskId?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    completed?: true
    type?: true
    summary?: true
    assignee?: true
    status?: true
    fileName?: true
    fileUrl?: true
    dueText?: true
    createdAt?: true
    jobType?: true
    taskId?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    completed: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName: string | null
    fileUrl: string | null
    dueText: string | null
    createdAt: Date
    jobType: string | null
    taskId: string
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    completed?: boolean
    type?: boolean
    summary?: boolean
    assignee?: boolean
    status?: boolean
    fileName?: boolean
    fileUrl?: boolean
    dueText?: boolean
    createdAt?: boolean
    jobType?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    completed?: boolean
    type?: boolean
    summary?: boolean
    assignee?: boolean
    status?: boolean
    fileName?: boolean
    fileUrl?: boolean
    dueText?: boolean
    createdAt?: boolean
    jobType?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    completed?: boolean
    type?: boolean
    summary?: boolean
    assignee?: boolean
    status?: boolean
    fileName?: boolean
    fileUrl?: boolean
    dueText?: boolean
    createdAt?: boolean
    jobType?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    completed?: boolean
    type?: boolean
    summary?: boolean
    assignee?: boolean
    status?: boolean
    fileName?: boolean
    fileUrl?: boolean
    dueText?: boolean
    createdAt?: boolean
    jobType?: boolean
    taskId?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "completed" | "type" | "summary" | "assignee" | "status" | "fileName" | "fileUrl" | "dueText" | "createdAt" | "jobType" | "taskId", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      completed: boolean
      type: string
      summary: string
      assignee: string
      status: string
      fileName: string | null
      fileUrl: string | null
      dueText: string | null
      createdAt: Date
      jobType: string | null
      taskId: string
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly completed: FieldRef<"Activity", 'Boolean'>
    readonly type: FieldRef<"Activity", 'String'>
    readonly summary: FieldRef<"Activity", 'String'>
    readonly assignee: FieldRef<"Activity", 'String'>
    readonly status: FieldRef<"Activity", 'String'>
    readonly fileName: FieldRef<"Activity", 'String'>
    readonly fileUrl: FieldRef<"Activity", 'String'>
    readonly dueText: FieldRef<"Activity", 'String'>
    readonly createdAt: FieldRef<"Activity", 'DateTime'>
    readonly jobType: FieldRef<"Activity", 'String'>
    readonly taskId: FieldRef<"Activity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model DocFolder
   */

  export type AggregateDocFolder = {
    _count: DocFolderCountAggregateOutputType | null
    _min: DocFolderMinAggregateOutputType | null
    _max: DocFolderMaxAggregateOutputType | null
  }

  export type DocFolderMinAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type DocFolderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type DocFolderCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    createdAt: number
    _all: number
  }


  export type DocFolderMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
  }

  export type DocFolderMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
  }

  export type DocFolderCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
    _all?: true
  }

  export type DocFolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocFolder to aggregate.
     */
    where?: DocFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFolders to fetch.
     */
    orderBy?: DocFolderOrderByWithRelationInput | DocFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocFolders
    **/
    _count?: true | DocFolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocFolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocFolderMaxAggregateInputType
  }

  export type GetDocFolderAggregateType<T extends DocFolderAggregateArgs> = {
        [P in keyof T & keyof AggregateDocFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocFolder[P]>
      : GetScalarType<T[P], AggregateDocFolder[P]>
  }




  export type DocFolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocFolderWhereInput
    orderBy?: DocFolderOrderByWithAggregationInput | DocFolderOrderByWithAggregationInput[]
    by: DocFolderScalarFieldEnum[] | DocFolderScalarFieldEnum
    having?: DocFolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocFolderCountAggregateInputType | true
    _min?: DocFolderMinAggregateInputType
    _max?: DocFolderMaxAggregateInputType
  }

  export type DocFolderGroupByOutputType = {
    id: string
    name: string
    parentId: string | null
    createdAt: Date
    _count: DocFolderCountAggregateOutputType | null
    _min: DocFolderMinAggregateOutputType | null
    _max: DocFolderMaxAggregateOutputType | null
  }

  type GetDocFolderGroupByPayload<T extends DocFolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocFolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocFolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocFolderGroupByOutputType[P]>
            : GetScalarType<T[P], DocFolderGroupByOutputType[P]>
        }
      >
    >


  export type DocFolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
    files?: boolean | DocFolder$filesArgs<ExtArgs>
    _count?: boolean | DocFolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["docFolder"]>

  export type DocFolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["docFolder"]>

  export type DocFolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["docFolder"]>

  export type DocFolderSelectScalar = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }

  export type DocFolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "parentId" | "createdAt", ExtArgs["result"]["docFolder"]>
  export type DocFolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | DocFolder$filesArgs<ExtArgs>
    _count?: boolean | DocFolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocFolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DocFolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DocFolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocFolder"
    objects: {
      files: Prisma.$DocFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      parentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["docFolder"]>
    composites: {}
  }

  type DocFolderGetPayload<S extends boolean | null | undefined | DocFolderDefaultArgs> = $Result.GetResult<Prisma.$DocFolderPayload, S>

  type DocFolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocFolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocFolderCountAggregateInputType | true
    }

  export interface DocFolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocFolder'], meta: { name: 'DocFolder' } }
    /**
     * Find zero or one DocFolder that matches the filter.
     * @param {DocFolderFindUniqueArgs} args - Arguments to find a DocFolder
     * @example
     * // Get one DocFolder
     * const docFolder = await prisma.docFolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocFolderFindUniqueArgs>(args: SelectSubset<T, DocFolderFindUniqueArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocFolder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocFolderFindUniqueOrThrowArgs} args - Arguments to find a DocFolder
     * @example
     * // Get one DocFolder
     * const docFolder = await prisma.docFolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocFolderFindUniqueOrThrowArgs>(args: SelectSubset<T, DocFolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocFolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderFindFirstArgs} args - Arguments to find a DocFolder
     * @example
     * // Get one DocFolder
     * const docFolder = await prisma.docFolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocFolderFindFirstArgs>(args?: SelectSubset<T, DocFolderFindFirstArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocFolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderFindFirstOrThrowArgs} args - Arguments to find a DocFolder
     * @example
     * // Get one DocFolder
     * const docFolder = await prisma.docFolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocFolderFindFirstOrThrowArgs>(args?: SelectSubset<T, DocFolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocFolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocFolders
     * const docFolders = await prisma.docFolder.findMany()
     * 
     * // Get first 10 DocFolders
     * const docFolders = await prisma.docFolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const docFolderWithIdOnly = await prisma.docFolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocFolderFindManyArgs>(args?: SelectSubset<T, DocFolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocFolder.
     * @param {DocFolderCreateArgs} args - Arguments to create a DocFolder.
     * @example
     * // Create one DocFolder
     * const DocFolder = await prisma.docFolder.create({
     *   data: {
     *     // ... data to create a DocFolder
     *   }
     * })
     * 
     */
    create<T extends DocFolderCreateArgs>(args: SelectSubset<T, DocFolderCreateArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocFolders.
     * @param {DocFolderCreateManyArgs} args - Arguments to create many DocFolders.
     * @example
     * // Create many DocFolders
     * const docFolder = await prisma.docFolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocFolderCreateManyArgs>(args?: SelectSubset<T, DocFolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocFolders and returns the data saved in the database.
     * @param {DocFolderCreateManyAndReturnArgs} args - Arguments to create many DocFolders.
     * @example
     * // Create many DocFolders
     * const docFolder = await prisma.docFolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocFolders and only return the `id`
     * const docFolderWithIdOnly = await prisma.docFolder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocFolderCreateManyAndReturnArgs>(args?: SelectSubset<T, DocFolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocFolder.
     * @param {DocFolderDeleteArgs} args - Arguments to delete one DocFolder.
     * @example
     * // Delete one DocFolder
     * const DocFolder = await prisma.docFolder.delete({
     *   where: {
     *     // ... filter to delete one DocFolder
     *   }
     * })
     * 
     */
    delete<T extends DocFolderDeleteArgs>(args: SelectSubset<T, DocFolderDeleteArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocFolder.
     * @param {DocFolderUpdateArgs} args - Arguments to update one DocFolder.
     * @example
     * // Update one DocFolder
     * const docFolder = await prisma.docFolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocFolderUpdateArgs>(args: SelectSubset<T, DocFolderUpdateArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocFolders.
     * @param {DocFolderDeleteManyArgs} args - Arguments to filter DocFolders to delete.
     * @example
     * // Delete a few DocFolders
     * const { count } = await prisma.docFolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocFolderDeleteManyArgs>(args?: SelectSubset<T, DocFolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocFolders
     * const docFolder = await prisma.docFolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocFolderUpdateManyArgs>(args: SelectSubset<T, DocFolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocFolders and returns the data updated in the database.
     * @param {DocFolderUpdateManyAndReturnArgs} args - Arguments to update many DocFolders.
     * @example
     * // Update many DocFolders
     * const docFolder = await prisma.docFolder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocFolders and only return the `id`
     * const docFolderWithIdOnly = await prisma.docFolder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocFolderUpdateManyAndReturnArgs>(args: SelectSubset<T, DocFolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocFolder.
     * @param {DocFolderUpsertArgs} args - Arguments to update or create a DocFolder.
     * @example
     * // Update or create a DocFolder
     * const docFolder = await prisma.docFolder.upsert({
     *   create: {
     *     // ... data to create a DocFolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocFolder we want to update
     *   }
     * })
     */
    upsert<T extends DocFolderUpsertArgs>(args: SelectSubset<T, DocFolderUpsertArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderCountArgs} args - Arguments to filter DocFolders to count.
     * @example
     * // Count the number of DocFolders
     * const count = await prisma.docFolder.count({
     *   where: {
     *     // ... the filter for the DocFolders we want to count
     *   }
     * })
    **/
    count<T extends DocFolderCountArgs>(
      args?: Subset<T, DocFolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocFolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocFolderAggregateArgs>(args: Subset<T, DocFolderAggregateArgs>): Prisma.PrismaPromise<GetDocFolderAggregateType<T>>

    /**
     * Group by DocFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocFolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocFolderGroupByArgs['orderBy'] }
        : { orderBy?: DocFolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocFolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocFolder model
   */
  readonly fields: DocFolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocFolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocFolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    files<T extends DocFolder$filesArgs<ExtArgs> = {}>(args?: Subset<T, DocFolder$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocFolder model
   */
  interface DocFolderFieldRefs {
    readonly id: FieldRef<"DocFolder", 'String'>
    readonly name: FieldRef<"DocFolder", 'String'>
    readonly parentId: FieldRef<"DocFolder", 'String'>
    readonly createdAt: FieldRef<"DocFolder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocFolder findUnique
   */
  export type DocFolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter, which DocFolder to fetch.
     */
    where: DocFolderWhereUniqueInput
  }

  /**
   * DocFolder findUniqueOrThrow
   */
  export type DocFolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter, which DocFolder to fetch.
     */
    where: DocFolderWhereUniqueInput
  }

  /**
   * DocFolder findFirst
   */
  export type DocFolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter, which DocFolder to fetch.
     */
    where?: DocFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFolders to fetch.
     */
    orderBy?: DocFolderOrderByWithRelationInput | DocFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocFolders.
     */
    cursor?: DocFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFolders.
     */
    distinct?: DocFolderScalarFieldEnum | DocFolderScalarFieldEnum[]
  }

  /**
   * DocFolder findFirstOrThrow
   */
  export type DocFolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter, which DocFolder to fetch.
     */
    where?: DocFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFolders to fetch.
     */
    orderBy?: DocFolderOrderByWithRelationInput | DocFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocFolders.
     */
    cursor?: DocFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFolders.
     */
    distinct?: DocFolderScalarFieldEnum | DocFolderScalarFieldEnum[]
  }

  /**
   * DocFolder findMany
   */
  export type DocFolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter, which DocFolders to fetch.
     */
    where?: DocFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFolders to fetch.
     */
    orderBy?: DocFolderOrderByWithRelationInput | DocFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocFolders.
     */
    cursor?: DocFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFolders.
     */
    distinct?: DocFolderScalarFieldEnum | DocFolderScalarFieldEnum[]
  }

  /**
   * DocFolder create
   */
  export type DocFolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * The data needed to create a DocFolder.
     */
    data: XOR<DocFolderCreateInput, DocFolderUncheckedCreateInput>
  }

  /**
   * DocFolder createMany
   */
  export type DocFolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocFolders.
     */
    data: DocFolderCreateManyInput | DocFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocFolder createManyAndReturn
   */
  export type DocFolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * The data used to create many DocFolders.
     */
    data: DocFolderCreateManyInput | DocFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocFolder update
   */
  export type DocFolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * The data needed to update a DocFolder.
     */
    data: XOR<DocFolderUpdateInput, DocFolderUncheckedUpdateInput>
    /**
     * Choose, which DocFolder to update.
     */
    where: DocFolderWhereUniqueInput
  }

  /**
   * DocFolder updateMany
   */
  export type DocFolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocFolders.
     */
    data: XOR<DocFolderUpdateManyMutationInput, DocFolderUncheckedUpdateManyInput>
    /**
     * Filter which DocFolders to update
     */
    where?: DocFolderWhereInput
    /**
     * Limit how many DocFolders to update.
     */
    limit?: number
  }

  /**
   * DocFolder updateManyAndReturn
   */
  export type DocFolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * The data used to update DocFolders.
     */
    data: XOR<DocFolderUpdateManyMutationInput, DocFolderUncheckedUpdateManyInput>
    /**
     * Filter which DocFolders to update
     */
    where?: DocFolderWhereInput
    /**
     * Limit how many DocFolders to update.
     */
    limit?: number
  }

  /**
   * DocFolder upsert
   */
  export type DocFolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * The filter to search for the DocFolder to update in case it exists.
     */
    where: DocFolderWhereUniqueInput
    /**
     * In case the DocFolder found by the `where` argument doesn't exist, create a new DocFolder with this data.
     */
    create: XOR<DocFolderCreateInput, DocFolderUncheckedCreateInput>
    /**
     * In case the DocFolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocFolderUpdateInput, DocFolderUncheckedUpdateInput>
  }

  /**
   * DocFolder delete
   */
  export type DocFolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    /**
     * Filter which DocFolder to delete.
     */
    where: DocFolderWhereUniqueInput
  }

  /**
   * DocFolder deleteMany
   */
  export type DocFolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocFolders to delete
     */
    where?: DocFolderWhereInput
    /**
     * Limit how many DocFolders to delete.
     */
    limit?: number
  }

  /**
   * DocFolder.files
   */
  export type DocFolder$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    where?: DocFileWhereInput
    orderBy?: DocFileOrderByWithRelationInput | DocFileOrderByWithRelationInput[]
    cursor?: DocFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocFileScalarFieldEnum | DocFileScalarFieldEnum[]
  }

  /**
   * DocFolder without action
   */
  export type DocFolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
  }


  /**
   * Model DocFile
   */

  export type AggregateDocFile = {
    _count: DocFileCountAggregateOutputType | null
    _min: DocFileMinAggregateOutputType | null
    _max: DocFileMaxAggregateOutputType | null
  }

  export type DocFileMinAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    fileUrl: string | null
    uploadedBy: string | null
    createdAt: Date | null
    cloudinaryPublicId: string | null
    folderId: string | null
  }

  export type DocFileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    fileUrl: string | null
    uploadedBy: string | null
    createdAt: Date | null
    cloudinaryPublicId: string | null
    folderId: string | null
  }

  export type DocFileCountAggregateOutputType = {
    id: number
    name: number
    size: number
    fileUrl: number
    uploadedBy: number
    createdAt: number
    cloudinaryPublicId: number
    folderId: number
    _all: number
  }


  export type DocFileMinAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
  }

  export type DocFileMaxAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
  }

  export type DocFileCountAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
    _all?: true
  }

  export type DocFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocFile to aggregate.
     */
    where?: DocFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFiles to fetch.
     */
    orderBy?: DocFileOrderByWithRelationInput | DocFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocFiles
    **/
    _count?: true | DocFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocFileMaxAggregateInputType
  }

  export type GetDocFileAggregateType<T extends DocFileAggregateArgs> = {
        [P in keyof T & keyof AggregateDocFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocFile[P]>
      : GetScalarType<T[P], AggregateDocFile[P]>
  }




  export type DocFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocFileWhereInput
    orderBy?: DocFileOrderByWithAggregationInput | DocFileOrderByWithAggregationInput[]
    by: DocFileScalarFieldEnum[] | DocFileScalarFieldEnum
    having?: DocFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocFileCountAggregateInputType | true
    _min?: DocFileMinAggregateInputType
    _max?: DocFileMaxAggregateInputType
  }

  export type DocFileGroupByOutputType = {
    id: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt: Date
    cloudinaryPublicId: string | null
    folderId: string | null
    _count: DocFileCountAggregateOutputType | null
    _min: DocFileMinAggregateOutputType | null
    _max: DocFileMaxAggregateOutputType | null
  }

  type GetDocFileGroupByPayload<T extends DocFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocFileGroupByOutputType[P]>
            : GetScalarType<T[P], DocFileGroupByOutputType[P]>
        }
      >
    >


  export type DocFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["docFile"]>

  export type DocFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["docFile"]>

  export type DocFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["docFile"]>

  export type DocFileSelectScalar = {
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
  }

  export type DocFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "size" | "fileUrl" | "uploadedBy" | "createdAt" | "cloudinaryPublicId" | "folderId", ExtArgs["result"]["docFile"]>
  export type DocFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }
  export type DocFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }
  export type DocFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | DocFile$folderArgs<ExtArgs>
  }

  export type $DocFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocFile"
    objects: {
      folder: Prisma.$DocFolderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      size: string
      fileUrl: string
      uploadedBy: string
      createdAt: Date
      cloudinaryPublicId: string | null
      folderId: string | null
    }, ExtArgs["result"]["docFile"]>
    composites: {}
  }

  type DocFileGetPayload<S extends boolean | null | undefined | DocFileDefaultArgs> = $Result.GetResult<Prisma.$DocFilePayload, S>

  type DocFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocFileCountAggregateInputType | true
    }

  export interface DocFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocFile'], meta: { name: 'DocFile' } }
    /**
     * Find zero or one DocFile that matches the filter.
     * @param {DocFileFindUniqueArgs} args - Arguments to find a DocFile
     * @example
     * // Get one DocFile
     * const docFile = await prisma.docFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocFileFindUniqueArgs>(args: SelectSubset<T, DocFileFindUniqueArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocFileFindUniqueOrThrowArgs} args - Arguments to find a DocFile
     * @example
     * // Get one DocFile
     * const docFile = await prisma.docFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocFileFindUniqueOrThrowArgs>(args: SelectSubset<T, DocFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileFindFirstArgs} args - Arguments to find a DocFile
     * @example
     * // Get one DocFile
     * const docFile = await prisma.docFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocFileFindFirstArgs>(args?: SelectSubset<T, DocFileFindFirstArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileFindFirstOrThrowArgs} args - Arguments to find a DocFile
     * @example
     * // Get one DocFile
     * const docFile = await prisma.docFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocFileFindFirstOrThrowArgs>(args?: SelectSubset<T, DocFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocFiles
     * const docFiles = await prisma.docFile.findMany()
     * 
     * // Get first 10 DocFiles
     * const docFiles = await prisma.docFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const docFileWithIdOnly = await prisma.docFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocFileFindManyArgs>(args?: SelectSubset<T, DocFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocFile.
     * @param {DocFileCreateArgs} args - Arguments to create a DocFile.
     * @example
     * // Create one DocFile
     * const DocFile = await prisma.docFile.create({
     *   data: {
     *     // ... data to create a DocFile
     *   }
     * })
     * 
     */
    create<T extends DocFileCreateArgs>(args: SelectSubset<T, DocFileCreateArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocFiles.
     * @param {DocFileCreateManyArgs} args - Arguments to create many DocFiles.
     * @example
     * // Create many DocFiles
     * const docFile = await prisma.docFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocFileCreateManyArgs>(args?: SelectSubset<T, DocFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocFiles and returns the data saved in the database.
     * @param {DocFileCreateManyAndReturnArgs} args - Arguments to create many DocFiles.
     * @example
     * // Create many DocFiles
     * const docFile = await prisma.docFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocFiles and only return the `id`
     * const docFileWithIdOnly = await prisma.docFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocFileCreateManyAndReturnArgs>(args?: SelectSubset<T, DocFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocFile.
     * @param {DocFileDeleteArgs} args - Arguments to delete one DocFile.
     * @example
     * // Delete one DocFile
     * const DocFile = await prisma.docFile.delete({
     *   where: {
     *     // ... filter to delete one DocFile
     *   }
     * })
     * 
     */
    delete<T extends DocFileDeleteArgs>(args: SelectSubset<T, DocFileDeleteArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocFile.
     * @param {DocFileUpdateArgs} args - Arguments to update one DocFile.
     * @example
     * // Update one DocFile
     * const docFile = await prisma.docFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocFileUpdateArgs>(args: SelectSubset<T, DocFileUpdateArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocFiles.
     * @param {DocFileDeleteManyArgs} args - Arguments to filter DocFiles to delete.
     * @example
     * // Delete a few DocFiles
     * const { count } = await prisma.docFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocFileDeleteManyArgs>(args?: SelectSubset<T, DocFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocFiles
     * const docFile = await prisma.docFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocFileUpdateManyArgs>(args: SelectSubset<T, DocFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocFiles and returns the data updated in the database.
     * @param {DocFileUpdateManyAndReturnArgs} args - Arguments to update many DocFiles.
     * @example
     * // Update many DocFiles
     * const docFile = await prisma.docFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocFiles and only return the `id`
     * const docFileWithIdOnly = await prisma.docFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocFileUpdateManyAndReturnArgs>(args: SelectSubset<T, DocFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocFile.
     * @param {DocFileUpsertArgs} args - Arguments to update or create a DocFile.
     * @example
     * // Update or create a DocFile
     * const docFile = await prisma.docFile.upsert({
     *   create: {
     *     // ... data to create a DocFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocFile we want to update
     *   }
     * })
     */
    upsert<T extends DocFileUpsertArgs>(args: SelectSubset<T, DocFileUpsertArgs<ExtArgs>>): Prisma__DocFileClient<$Result.GetResult<Prisma.$DocFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileCountArgs} args - Arguments to filter DocFiles to count.
     * @example
     * // Count the number of DocFiles
     * const count = await prisma.docFile.count({
     *   where: {
     *     // ... the filter for the DocFiles we want to count
     *   }
     * })
    **/
    count<T extends DocFileCountArgs>(
      args?: Subset<T, DocFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocFileAggregateArgs>(args: Subset<T, DocFileAggregateArgs>): Prisma.PrismaPromise<GetDocFileAggregateType<T>>

    /**
     * Group by DocFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocFileGroupByArgs['orderBy'] }
        : { orderBy?: DocFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocFile model
   */
  readonly fields: DocFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folder<T extends DocFile$folderArgs<ExtArgs> = {}>(args?: Subset<T, DocFile$folderArgs<ExtArgs>>): Prisma__DocFolderClient<$Result.GetResult<Prisma.$DocFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocFile model
   */
  interface DocFileFieldRefs {
    readonly id: FieldRef<"DocFile", 'String'>
    readonly name: FieldRef<"DocFile", 'String'>
    readonly size: FieldRef<"DocFile", 'String'>
    readonly fileUrl: FieldRef<"DocFile", 'String'>
    readonly uploadedBy: FieldRef<"DocFile", 'String'>
    readonly createdAt: FieldRef<"DocFile", 'DateTime'>
    readonly cloudinaryPublicId: FieldRef<"DocFile", 'String'>
    readonly folderId: FieldRef<"DocFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DocFile findUnique
   */
  export type DocFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter, which DocFile to fetch.
     */
    where: DocFileWhereUniqueInput
  }

  /**
   * DocFile findUniqueOrThrow
   */
  export type DocFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter, which DocFile to fetch.
     */
    where: DocFileWhereUniqueInput
  }

  /**
   * DocFile findFirst
   */
  export type DocFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter, which DocFile to fetch.
     */
    where?: DocFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFiles to fetch.
     */
    orderBy?: DocFileOrderByWithRelationInput | DocFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocFiles.
     */
    cursor?: DocFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFiles.
     */
    distinct?: DocFileScalarFieldEnum | DocFileScalarFieldEnum[]
  }

  /**
   * DocFile findFirstOrThrow
   */
  export type DocFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter, which DocFile to fetch.
     */
    where?: DocFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFiles to fetch.
     */
    orderBy?: DocFileOrderByWithRelationInput | DocFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocFiles.
     */
    cursor?: DocFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFiles.
     */
    distinct?: DocFileScalarFieldEnum | DocFileScalarFieldEnum[]
  }

  /**
   * DocFile findMany
   */
  export type DocFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter, which DocFiles to fetch.
     */
    where?: DocFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocFiles to fetch.
     */
    orderBy?: DocFileOrderByWithRelationInput | DocFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocFiles.
     */
    cursor?: DocFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocFiles.
     */
    distinct?: DocFileScalarFieldEnum | DocFileScalarFieldEnum[]
  }

  /**
   * DocFile create
   */
  export type DocFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * The data needed to create a DocFile.
     */
    data: XOR<DocFileCreateInput, DocFileUncheckedCreateInput>
  }

  /**
   * DocFile createMany
   */
  export type DocFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocFiles.
     */
    data: DocFileCreateManyInput | DocFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocFile createManyAndReturn
   */
  export type DocFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * The data used to create many DocFiles.
     */
    data: DocFileCreateManyInput | DocFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocFile update
   */
  export type DocFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * The data needed to update a DocFile.
     */
    data: XOR<DocFileUpdateInput, DocFileUncheckedUpdateInput>
    /**
     * Choose, which DocFile to update.
     */
    where: DocFileWhereUniqueInput
  }

  /**
   * DocFile updateMany
   */
  export type DocFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocFiles.
     */
    data: XOR<DocFileUpdateManyMutationInput, DocFileUncheckedUpdateManyInput>
    /**
     * Filter which DocFiles to update
     */
    where?: DocFileWhereInput
    /**
     * Limit how many DocFiles to update.
     */
    limit?: number
  }

  /**
   * DocFile updateManyAndReturn
   */
  export type DocFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * The data used to update DocFiles.
     */
    data: XOR<DocFileUpdateManyMutationInput, DocFileUncheckedUpdateManyInput>
    /**
     * Filter which DocFiles to update
     */
    where?: DocFileWhereInput
    /**
     * Limit how many DocFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocFile upsert
   */
  export type DocFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * The filter to search for the DocFile to update in case it exists.
     */
    where: DocFileWhereUniqueInput
    /**
     * In case the DocFile found by the `where` argument doesn't exist, create a new DocFile with this data.
     */
    create: XOR<DocFileCreateInput, DocFileUncheckedCreateInput>
    /**
     * In case the DocFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocFileUpdateInput, DocFileUncheckedUpdateInput>
  }

  /**
   * DocFile delete
   */
  export type DocFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
    /**
     * Filter which DocFile to delete.
     */
    where: DocFileWhereUniqueInput
  }

  /**
   * DocFile deleteMany
   */
  export type DocFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocFiles to delete
     */
    where?: DocFileWhereInput
    /**
     * Limit how many DocFiles to delete.
     */
    limit?: number
  }

  /**
   * DocFile.folder
   */
  export type DocFile$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFolder
     */
    select?: DocFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFolder
     */
    omit?: DocFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFolderInclude<ExtArgs> | null
    where?: DocFolderWhereInput
  }

  /**
   * DocFile without action
   */
  export type DocFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocFile
     */
    select?: DocFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocFile
     */
    omit?: DocFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocFileInclude<ExtArgs> | null
  }


  /**
   * Model ProcessedFolder
   */

  export type AggregateProcessedFolder = {
    _count: ProcessedFolderCountAggregateOutputType | null
    _min: ProcessedFolderMinAggregateOutputType | null
    _max: ProcessedFolderMaxAggregateOutputType | null
  }

  export type ProcessedFolderMinAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type ProcessedFolderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    createdAt: Date | null
  }

  export type ProcessedFolderCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    createdAt: number
    _all: number
  }


  export type ProcessedFolderMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
  }

  export type ProcessedFolderMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
  }

  export type ProcessedFolderCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    createdAt?: true
    _all?: true
  }

  export type ProcessedFolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedFolder to aggregate.
     */
    where?: ProcessedFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFolders to fetch.
     */
    orderBy?: ProcessedFolderOrderByWithRelationInput | ProcessedFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedFolders
    **/
    _count?: true | ProcessedFolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedFolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedFolderMaxAggregateInputType
  }

  export type GetProcessedFolderAggregateType<T extends ProcessedFolderAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedFolder[P]>
      : GetScalarType<T[P], AggregateProcessedFolder[P]>
  }




  export type ProcessedFolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedFolderWhereInput
    orderBy?: ProcessedFolderOrderByWithAggregationInput | ProcessedFolderOrderByWithAggregationInput[]
    by: ProcessedFolderScalarFieldEnum[] | ProcessedFolderScalarFieldEnum
    having?: ProcessedFolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedFolderCountAggregateInputType | true
    _min?: ProcessedFolderMinAggregateInputType
    _max?: ProcessedFolderMaxAggregateInputType
  }

  export type ProcessedFolderGroupByOutputType = {
    id: string
    name: string
    parentId: string | null
    createdAt: Date
    _count: ProcessedFolderCountAggregateOutputType | null
    _min: ProcessedFolderMinAggregateOutputType | null
    _max: ProcessedFolderMaxAggregateOutputType | null
  }

  type GetProcessedFolderGroupByPayload<T extends ProcessedFolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedFolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedFolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedFolderGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedFolderGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedFolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
    files?: boolean | ProcessedFolder$filesArgs<ExtArgs>
    _count?: boolean | ProcessedFolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processedFolder"]>

  export type ProcessedFolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processedFolder"]>

  export type ProcessedFolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processedFolder"]>

  export type ProcessedFolderSelectScalar = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    createdAt?: boolean
  }

  export type ProcessedFolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "parentId" | "createdAt", ExtArgs["result"]["processedFolder"]>
  export type ProcessedFolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    files?: boolean | ProcessedFolder$filesArgs<ExtArgs>
    _count?: boolean | ProcessedFolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProcessedFolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProcessedFolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProcessedFolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedFolder"
    objects: {
      files: Prisma.$ProcessedFilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      parentId: string | null
      createdAt: Date
    }, ExtArgs["result"]["processedFolder"]>
    composites: {}
  }

  type ProcessedFolderGetPayload<S extends boolean | null | undefined | ProcessedFolderDefaultArgs> = $Result.GetResult<Prisma.$ProcessedFolderPayload, S>

  type ProcessedFolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedFolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedFolderCountAggregateInputType | true
    }

  export interface ProcessedFolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedFolder'], meta: { name: 'ProcessedFolder' } }
    /**
     * Find zero or one ProcessedFolder that matches the filter.
     * @param {ProcessedFolderFindUniqueArgs} args - Arguments to find a ProcessedFolder
     * @example
     * // Get one ProcessedFolder
     * const processedFolder = await prisma.processedFolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedFolderFindUniqueArgs>(args: SelectSubset<T, ProcessedFolderFindUniqueArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedFolder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedFolderFindUniqueOrThrowArgs} args - Arguments to find a ProcessedFolder
     * @example
     * // Get one ProcessedFolder
     * const processedFolder = await prisma.processedFolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedFolderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedFolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedFolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderFindFirstArgs} args - Arguments to find a ProcessedFolder
     * @example
     * // Get one ProcessedFolder
     * const processedFolder = await prisma.processedFolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedFolderFindFirstArgs>(args?: SelectSubset<T, ProcessedFolderFindFirstArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedFolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderFindFirstOrThrowArgs} args - Arguments to find a ProcessedFolder
     * @example
     * // Get one ProcessedFolder
     * const processedFolder = await prisma.processedFolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedFolderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedFolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedFolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedFolders
     * const processedFolders = await prisma.processedFolder.findMany()
     * 
     * // Get first 10 ProcessedFolders
     * const processedFolders = await prisma.processedFolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedFolderWithIdOnly = await prisma.processedFolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedFolderFindManyArgs>(args?: SelectSubset<T, ProcessedFolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedFolder.
     * @param {ProcessedFolderCreateArgs} args - Arguments to create a ProcessedFolder.
     * @example
     * // Create one ProcessedFolder
     * const ProcessedFolder = await prisma.processedFolder.create({
     *   data: {
     *     // ... data to create a ProcessedFolder
     *   }
     * })
     * 
     */
    create<T extends ProcessedFolderCreateArgs>(args: SelectSubset<T, ProcessedFolderCreateArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedFolders.
     * @param {ProcessedFolderCreateManyArgs} args - Arguments to create many ProcessedFolders.
     * @example
     * // Create many ProcessedFolders
     * const processedFolder = await prisma.processedFolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedFolderCreateManyArgs>(args?: SelectSubset<T, ProcessedFolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedFolders and returns the data saved in the database.
     * @param {ProcessedFolderCreateManyAndReturnArgs} args - Arguments to create many ProcessedFolders.
     * @example
     * // Create many ProcessedFolders
     * const processedFolder = await prisma.processedFolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedFolders and only return the `id`
     * const processedFolderWithIdOnly = await prisma.processedFolder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedFolderCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedFolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedFolder.
     * @param {ProcessedFolderDeleteArgs} args - Arguments to delete one ProcessedFolder.
     * @example
     * // Delete one ProcessedFolder
     * const ProcessedFolder = await prisma.processedFolder.delete({
     *   where: {
     *     // ... filter to delete one ProcessedFolder
     *   }
     * })
     * 
     */
    delete<T extends ProcessedFolderDeleteArgs>(args: SelectSubset<T, ProcessedFolderDeleteArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedFolder.
     * @param {ProcessedFolderUpdateArgs} args - Arguments to update one ProcessedFolder.
     * @example
     * // Update one ProcessedFolder
     * const processedFolder = await prisma.processedFolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedFolderUpdateArgs>(args: SelectSubset<T, ProcessedFolderUpdateArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedFolders.
     * @param {ProcessedFolderDeleteManyArgs} args - Arguments to filter ProcessedFolders to delete.
     * @example
     * // Delete a few ProcessedFolders
     * const { count } = await prisma.processedFolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedFolderDeleteManyArgs>(args?: SelectSubset<T, ProcessedFolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedFolders
     * const processedFolder = await prisma.processedFolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedFolderUpdateManyArgs>(args: SelectSubset<T, ProcessedFolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedFolders and returns the data updated in the database.
     * @param {ProcessedFolderUpdateManyAndReturnArgs} args - Arguments to update many ProcessedFolders.
     * @example
     * // Update many ProcessedFolders
     * const processedFolder = await prisma.processedFolder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedFolders and only return the `id`
     * const processedFolderWithIdOnly = await prisma.processedFolder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedFolderUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedFolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedFolder.
     * @param {ProcessedFolderUpsertArgs} args - Arguments to update or create a ProcessedFolder.
     * @example
     * // Update or create a ProcessedFolder
     * const processedFolder = await prisma.processedFolder.upsert({
     *   create: {
     *     // ... data to create a ProcessedFolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedFolder we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedFolderUpsertArgs>(args: SelectSubset<T, ProcessedFolderUpsertArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderCountArgs} args - Arguments to filter ProcessedFolders to count.
     * @example
     * // Count the number of ProcessedFolders
     * const count = await prisma.processedFolder.count({
     *   where: {
     *     // ... the filter for the ProcessedFolders we want to count
     *   }
     * })
    **/
    count<T extends ProcessedFolderCountArgs>(
      args?: Subset<T, ProcessedFolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedFolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedFolderAggregateArgs>(args: Subset<T, ProcessedFolderAggregateArgs>): Prisma.PrismaPromise<GetProcessedFolderAggregateType<T>>

    /**
     * Group by ProcessedFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedFolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedFolderGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedFolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedFolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedFolder model
   */
  readonly fields: ProcessedFolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedFolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedFolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    files<T extends ProcessedFolder$filesArgs<ExtArgs> = {}>(args?: Subset<T, ProcessedFolder$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedFolder model
   */
  interface ProcessedFolderFieldRefs {
    readonly id: FieldRef<"ProcessedFolder", 'String'>
    readonly name: FieldRef<"ProcessedFolder", 'String'>
    readonly parentId: FieldRef<"ProcessedFolder", 'String'>
    readonly createdAt: FieldRef<"ProcessedFolder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedFolder findUnique
   */
  export type ProcessedFolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFolder to fetch.
     */
    where: ProcessedFolderWhereUniqueInput
  }

  /**
   * ProcessedFolder findUniqueOrThrow
   */
  export type ProcessedFolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFolder to fetch.
     */
    where: ProcessedFolderWhereUniqueInput
  }

  /**
   * ProcessedFolder findFirst
   */
  export type ProcessedFolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFolder to fetch.
     */
    where?: ProcessedFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFolders to fetch.
     */
    orderBy?: ProcessedFolderOrderByWithRelationInput | ProcessedFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedFolders.
     */
    cursor?: ProcessedFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFolders.
     */
    distinct?: ProcessedFolderScalarFieldEnum | ProcessedFolderScalarFieldEnum[]
  }

  /**
   * ProcessedFolder findFirstOrThrow
   */
  export type ProcessedFolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFolder to fetch.
     */
    where?: ProcessedFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFolders to fetch.
     */
    orderBy?: ProcessedFolderOrderByWithRelationInput | ProcessedFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedFolders.
     */
    cursor?: ProcessedFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFolders.
     */
    distinct?: ProcessedFolderScalarFieldEnum | ProcessedFolderScalarFieldEnum[]
  }

  /**
   * ProcessedFolder findMany
   */
  export type ProcessedFolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFolders to fetch.
     */
    where?: ProcessedFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFolders to fetch.
     */
    orderBy?: ProcessedFolderOrderByWithRelationInput | ProcessedFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedFolders.
     */
    cursor?: ProcessedFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFolders.
     */
    distinct?: ProcessedFolderScalarFieldEnum | ProcessedFolderScalarFieldEnum[]
  }

  /**
   * ProcessedFolder create
   */
  export type ProcessedFolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessedFolder.
     */
    data: XOR<ProcessedFolderCreateInput, ProcessedFolderUncheckedCreateInput>
  }

  /**
   * ProcessedFolder createMany
   */
  export type ProcessedFolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedFolders.
     */
    data: ProcessedFolderCreateManyInput | ProcessedFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedFolder createManyAndReturn
   */
  export type ProcessedFolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedFolders.
     */
    data: ProcessedFolderCreateManyInput | ProcessedFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedFolder update
   */
  export type ProcessedFolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessedFolder.
     */
    data: XOR<ProcessedFolderUpdateInput, ProcessedFolderUncheckedUpdateInput>
    /**
     * Choose, which ProcessedFolder to update.
     */
    where: ProcessedFolderWhereUniqueInput
  }

  /**
   * ProcessedFolder updateMany
   */
  export type ProcessedFolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedFolders.
     */
    data: XOR<ProcessedFolderUpdateManyMutationInput, ProcessedFolderUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedFolders to update
     */
    where?: ProcessedFolderWhereInput
    /**
     * Limit how many ProcessedFolders to update.
     */
    limit?: number
  }

  /**
   * ProcessedFolder updateManyAndReturn
   */
  export type ProcessedFolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedFolders.
     */
    data: XOR<ProcessedFolderUpdateManyMutationInput, ProcessedFolderUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedFolders to update
     */
    where?: ProcessedFolderWhereInput
    /**
     * Limit how many ProcessedFolders to update.
     */
    limit?: number
  }

  /**
   * ProcessedFolder upsert
   */
  export type ProcessedFolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessedFolder to update in case it exists.
     */
    where: ProcessedFolderWhereUniqueInput
    /**
     * In case the ProcessedFolder found by the `where` argument doesn't exist, create a new ProcessedFolder with this data.
     */
    create: XOR<ProcessedFolderCreateInput, ProcessedFolderUncheckedCreateInput>
    /**
     * In case the ProcessedFolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedFolderUpdateInput, ProcessedFolderUncheckedUpdateInput>
  }

  /**
   * ProcessedFolder delete
   */
  export type ProcessedFolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    /**
     * Filter which ProcessedFolder to delete.
     */
    where: ProcessedFolderWhereUniqueInput
  }

  /**
   * ProcessedFolder deleteMany
   */
  export type ProcessedFolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedFolders to delete
     */
    where?: ProcessedFolderWhereInput
    /**
     * Limit how many ProcessedFolders to delete.
     */
    limit?: number
  }

  /**
   * ProcessedFolder.files
   */
  export type ProcessedFolder$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    where?: ProcessedFileWhereInput
    orderBy?: ProcessedFileOrderByWithRelationInput | ProcessedFileOrderByWithRelationInput[]
    cursor?: ProcessedFileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcessedFileScalarFieldEnum | ProcessedFileScalarFieldEnum[]
  }

  /**
   * ProcessedFolder without action
   */
  export type ProcessedFolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
  }


  /**
   * Model ProcessedFile
   */

  export type AggregateProcessedFile = {
    _count: ProcessedFileCountAggregateOutputType | null
    _min: ProcessedFileMinAggregateOutputType | null
    _max: ProcessedFileMaxAggregateOutputType | null
  }

  export type ProcessedFileMinAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    fileUrl: string | null
    uploadedBy: string | null
    createdAt: Date | null
    cloudinaryPublicId: string | null
    folderId: string | null
  }

  export type ProcessedFileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    size: string | null
    fileUrl: string | null
    uploadedBy: string | null
    createdAt: Date | null
    cloudinaryPublicId: string | null
    folderId: string | null
  }

  export type ProcessedFileCountAggregateOutputType = {
    id: number
    name: number
    size: number
    fileUrl: number
    uploadedBy: number
    createdAt: number
    cloudinaryPublicId: number
    folderId: number
    _all: number
  }


  export type ProcessedFileMinAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
  }

  export type ProcessedFileMaxAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
  }

  export type ProcessedFileCountAggregateInputType = {
    id?: true
    name?: true
    size?: true
    fileUrl?: true
    uploadedBy?: true
    createdAt?: true
    cloudinaryPublicId?: true
    folderId?: true
    _all?: true
  }

  export type ProcessedFileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedFile to aggregate.
     */
    where?: ProcessedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFiles to fetch.
     */
    orderBy?: ProcessedFileOrderByWithRelationInput | ProcessedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedFiles
    **/
    _count?: true | ProcessedFileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedFileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedFileMaxAggregateInputType
  }

  export type GetProcessedFileAggregateType<T extends ProcessedFileAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedFile[P]>
      : GetScalarType<T[P], AggregateProcessedFile[P]>
  }




  export type ProcessedFileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedFileWhereInput
    orderBy?: ProcessedFileOrderByWithAggregationInput | ProcessedFileOrderByWithAggregationInput[]
    by: ProcessedFileScalarFieldEnum[] | ProcessedFileScalarFieldEnum
    having?: ProcessedFileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedFileCountAggregateInputType | true
    _min?: ProcessedFileMinAggregateInputType
    _max?: ProcessedFileMaxAggregateInputType
  }

  export type ProcessedFileGroupByOutputType = {
    id: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt: Date
    cloudinaryPublicId: string | null
    folderId: string | null
    _count: ProcessedFileCountAggregateOutputType | null
    _min: ProcessedFileMinAggregateOutputType | null
    _max: ProcessedFileMaxAggregateOutputType | null
  }

  type GetProcessedFileGroupByPayload<T extends ProcessedFileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedFileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedFileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedFileGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedFileGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedFileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["processedFile"]>

  export type ProcessedFileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["processedFile"]>

  export type ProcessedFileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }, ExtArgs["result"]["processedFile"]>

  export type ProcessedFileSelectScalar = {
    id?: boolean
    name?: boolean
    size?: boolean
    fileUrl?: boolean
    uploadedBy?: boolean
    createdAt?: boolean
    cloudinaryPublicId?: boolean
    folderId?: boolean
  }

  export type ProcessedFileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "size" | "fileUrl" | "uploadedBy" | "createdAt" | "cloudinaryPublicId" | "folderId", ExtArgs["result"]["processedFile"]>
  export type ProcessedFileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }
  export type ProcessedFileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }
  export type ProcessedFileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folder?: boolean | ProcessedFile$folderArgs<ExtArgs>
  }

  export type $ProcessedFilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedFile"
    objects: {
      folder: Prisma.$ProcessedFolderPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      size: string
      fileUrl: string
      uploadedBy: string
      createdAt: Date
      cloudinaryPublicId: string | null
      folderId: string | null
    }, ExtArgs["result"]["processedFile"]>
    composites: {}
  }

  type ProcessedFileGetPayload<S extends boolean | null | undefined | ProcessedFileDefaultArgs> = $Result.GetResult<Prisma.$ProcessedFilePayload, S>

  type ProcessedFileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedFileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedFileCountAggregateInputType | true
    }

  export interface ProcessedFileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedFile'], meta: { name: 'ProcessedFile' } }
    /**
     * Find zero or one ProcessedFile that matches the filter.
     * @param {ProcessedFileFindUniqueArgs} args - Arguments to find a ProcessedFile
     * @example
     * // Get one ProcessedFile
     * const processedFile = await prisma.processedFile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedFileFindUniqueArgs>(args: SelectSubset<T, ProcessedFileFindUniqueArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedFile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedFileFindUniqueOrThrowArgs} args - Arguments to find a ProcessedFile
     * @example
     * // Get one ProcessedFile
     * const processedFile = await prisma.processedFile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedFileFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedFileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedFile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileFindFirstArgs} args - Arguments to find a ProcessedFile
     * @example
     * // Get one ProcessedFile
     * const processedFile = await prisma.processedFile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedFileFindFirstArgs>(args?: SelectSubset<T, ProcessedFileFindFirstArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedFile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileFindFirstOrThrowArgs} args - Arguments to find a ProcessedFile
     * @example
     * // Get one ProcessedFile
     * const processedFile = await prisma.processedFile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedFileFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedFileFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedFiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedFiles
     * const processedFiles = await prisma.processedFile.findMany()
     * 
     * // Get first 10 ProcessedFiles
     * const processedFiles = await prisma.processedFile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedFileWithIdOnly = await prisma.processedFile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedFileFindManyArgs>(args?: SelectSubset<T, ProcessedFileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedFile.
     * @param {ProcessedFileCreateArgs} args - Arguments to create a ProcessedFile.
     * @example
     * // Create one ProcessedFile
     * const ProcessedFile = await prisma.processedFile.create({
     *   data: {
     *     // ... data to create a ProcessedFile
     *   }
     * })
     * 
     */
    create<T extends ProcessedFileCreateArgs>(args: SelectSubset<T, ProcessedFileCreateArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedFiles.
     * @param {ProcessedFileCreateManyArgs} args - Arguments to create many ProcessedFiles.
     * @example
     * // Create many ProcessedFiles
     * const processedFile = await prisma.processedFile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedFileCreateManyArgs>(args?: SelectSubset<T, ProcessedFileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedFiles and returns the data saved in the database.
     * @param {ProcessedFileCreateManyAndReturnArgs} args - Arguments to create many ProcessedFiles.
     * @example
     * // Create many ProcessedFiles
     * const processedFile = await prisma.processedFile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedFiles and only return the `id`
     * const processedFileWithIdOnly = await prisma.processedFile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedFileCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedFileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedFile.
     * @param {ProcessedFileDeleteArgs} args - Arguments to delete one ProcessedFile.
     * @example
     * // Delete one ProcessedFile
     * const ProcessedFile = await prisma.processedFile.delete({
     *   where: {
     *     // ... filter to delete one ProcessedFile
     *   }
     * })
     * 
     */
    delete<T extends ProcessedFileDeleteArgs>(args: SelectSubset<T, ProcessedFileDeleteArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedFile.
     * @param {ProcessedFileUpdateArgs} args - Arguments to update one ProcessedFile.
     * @example
     * // Update one ProcessedFile
     * const processedFile = await prisma.processedFile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedFileUpdateArgs>(args: SelectSubset<T, ProcessedFileUpdateArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedFiles.
     * @param {ProcessedFileDeleteManyArgs} args - Arguments to filter ProcessedFiles to delete.
     * @example
     * // Delete a few ProcessedFiles
     * const { count } = await prisma.processedFile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedFileDeleteManyArgs>(args?: SelectSubset<T, ProcessedFileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedFiles
     * const processedFile = await prisma.processedFile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedFileUpdateManyArgs>(args: SelectSubset<T, ProcessedFileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedFiles and returns the data updated in the database.
     * @param {ProcessedFileUpdateManyAndReturnArgs} args - Arguments to update many ProcessedFiles.
     * @example
     * // Update many ProcessedFiles
     * const processedFile = await prisma.processedFile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedFiles and only return the `id`
     * const processedFileWithIdOnly = await prisma.processedFile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedFileUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedFileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedFile.
     * @param {ProcessedFileUpsertArgs} args - Arguments to update or create a ProcessedFile.
     * @example
     * // Update or create a ProcessedFile
     * const processedFile = await prisma.processedFile.upsert({
     *   create: {
     *     // ... data to create a ProcessedFile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedFile we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedFileUpsertArgs>(args: SelectSubset<T, ProcessedFileUpsertArgs<ExtArgs>>): Prisma__ProcessedFileClient<$Result.GetResult<Prisma.$ProcessedFilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedFiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileCountArgs} args - Arguments to filter ProcessedFiles to count.
     * @example
     * // Count the number of ProcessedFiles
     * const count = await prisma.processedFile.count({
     *   where: {
     *     // ... the filter for the ProcessedFiles we want to count
     *   }
     * })
    **/
    count<T extends ProcessedFileCountArgs>(
      args?: Subset<T, ProcessedFileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedFileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedFileAggregateArgs>(args: Subset<T, ProcessedFileAggregateArgs>): Prisma.PrismaPromise<GetProcessedFileAggregateType<T>>

    /**
     * Group by ProcessedFile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedFileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedFileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedFileGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedFileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedFileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedFile model
   */
  readonly fields: ProcessedFileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedFile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedFileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folder<T extends ProcessedFile$folderArgs<ExtArgs> = {}>(args?: Subset<T, ProcessedFile$folderArgs<ExtArgs>>): Prisma__ProcessedFolderClient<$Result.GetResult<Prisma.$ProcessedFolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedFile model
   */
  interface ProcessedFileFieldRefs {
    readonly id: FieldRef<"ProcessedFile", 'String'>
    readonly name: FieldRef<"ProcessedFile", 'String'>
    readonly size: FieldRef<"ProcessedFile", 'String'>
    readonly fileUrl: FieldRef<"ProcessedFile", 'String'>
    readonly uploadedBy: FieldRef<"ProcessedFile", 'String'>
    readonly createdAt: FieldRef<"ProcessedFile", 'DateTime'>
    readonly cloudinaryPublicId: FieldRef<"ProcessedFile", 'String'>
    readonly folderId: FieldRef<"ProcessedFile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedFile findUnique
   */
  export type ProcessedFileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFile to fetch.
     */
    where: ProcessedFileWhereUniqueInput
  }

  /**
   * ProcessedFile findUniqueOrThrow
   */
  export type ProcessedFileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFile to fetch.
     */
    where: ProcessedFileWhereUniqueInput
  }

  /**
   * ProcessedFile findFirst
   */
  export type ProcessedFileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFile to fetch.
     */
    where?: ProcessedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFiles to fetch.
     */
    orderBy?: ProcessedFileOrderByWithRelationInput | ProcessedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedFiles.
     */
    cursor?: ProcessedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFiles.
     */
    distinct?: ProcessedFileScalarFieldEnum | ProcessedFileScalarFieldEnum[]
  }

  /**
   * ProcessedFile findFirstOrThrow
   */
  export type ProcessedFileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFile to fetch.
     */
    where?: ProcessedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFiles to fetch.
     */
    orderBy?: ProcessedFileOrderByWithRelationInput | ProcessedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedFiles.
     */
    cursor?: ProcessedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFiles.
     */
    distinct?: ProcessedFileScalarFieldEnum | ProcessedFileScalarFieldEnum[]
  }

  /**
   * ProcessedFile findMany
   */
  export type ProcessedFileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedFiles to fetch.
     */
    where?: ProcessedFileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedFiles to fetch.
     */
    orderBy?: ProcessedFileOrderByWithRelationInput | ProcessedFileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedFiles.
     */
    cursor?: ProcessedFileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedFiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedFiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedFiles.
     */
    distinct?: ProcessedFileScalarFieldEnum | ProcessedFileScalarFieldEnum[]
  }

  /**
   * ProcessedFile create
   */
  export type ProcessedFileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessedFile.
     */
    data: XOR<ProcessedFileCreateInput, ProcessedFileUncheckedCreateInput>
  }

  /**
   * ProcessedFile createMany
   */
  export type ProcessedFileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedFiles.
     */
    data: ProcessedFileCreateManyInput | ProcessedFileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedFile createManyAndReturn
   */
  export type ProcessedFileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedFiles.
     */
    data: ProcessedFileCreateManyInput | ProcessedFileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessedFile update
   */
  export type ProcessedFileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessedFile.
     */
    data: XOR<ProcessedFileUpdateInput, ProcessedFileUncheckedUpdateInput>
    /**
     * Choose, which ProcessedFile to update.
     */
    where: ProcessedFileWhereUniqueInput
  }

  /**
   * ProcessedFile updateMany
   */
  export type ProcessedFileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedFiles.
     */
    data: XOR<ProcessedFileUpdateManyMutationInput, ProcessedFileUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedFiles to update
     */
    where?: ProcessedFileWhereInput
    /**
     * Limit how many ProcessedFiles to update.
     */
    limit?: number
  }

  /**
   * ProcessedFile updateManyAndReturn
   */
  export type ProcessedFileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedFiles.
     */
    data: XOR<ProcessedFileUpdateManyMutationInput, ProcessedFileUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedFiles to update
     */
    where?: ProcessedFileWhereInput
    /**
     * Limit how many ProcessedFiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessedFile upsert
   */
  export type ProcessedFileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessedFile to update in case it exists.
     */
    where: ProcessedFileWhereUniqueInput
    /**
     * In case the ProcessedFile found by the `where` argument doesn't exist, create a new ProcessedFile with this data.
     */
    create: XOR<ProcessedFileCreateInput, ProcessedFileUncheckedCreateInput>
    /**
     * In case the ProcessedFile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedFileUpdateInput, ProcessedFileUncheckedUpdateInput>
  }

  /**
   * ProcessedFile delete
   */
  export type ProcessedFileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
    /**
     * Filter which ProcessedFile to delete.
     */
    where: ProcessedFileWhereUniqueInput
  }

  /**
   * ProcessedFile deleteMany
   */
  export type ProcessedFileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedFiles to delete
     */
    where?: ProcessedFileWhereInput
    /**
     * Limit how many ProcessedFiles to delete.
     */
    limit?: number
  }

  /**
   * ProcessedFile.folder
   */
  export type ProcessedFile$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFolder
     */
    select?: ProcessedFolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFolder
     */
    omit?: ProcessedFolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFolderInclude<ExtArgs> | null
    where?: ProcessedFolderWhereInput
  }

  /**
   * ProcessedFile without action
   */
  export type ProcessedFileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedFile
     */
    select?: ProcessedFileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedFile
     */
    omit?: ProcessedFileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedFileInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    sender: string | null
    message: string | null
    isRead: boolean | null
    taskId: string | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    sender: string | null
    message: string | null
    isRead: boolean | null
    taskId: string | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    sender: number
    message: number
    receiver: number
    isRead: number
    taskId: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    sender?: true
    message?: true
    isRead?: true
    taskId?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    sender?: true
    message?: true
    isRead?: true
    taskId?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    sender?: true
    message?: true
    receiver?: true
    isRead?: true
    taskId?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    sender: string
    message: string
    receiver: string[]
    isRead: boolean
    taskId: string | null
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    message?: boolean
    receiver?: boolean
    isRead?: boolean
    taskId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    message?: boolean
    receiver?: boolean
    isRead?: boolean
    taskId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sender?: boolean
    message?: boolean
    receiver?: boolean
    isRead?: boolean
    taskId?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    sender?: boolean
    message?: boolean
    receiver?: boolean
    isRead?: boolean
    taskId?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sender" | "message" | "receiver" | "isRead" | "taskId" | "createdAt", ExtArgs["result"]["notification"]>

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sender: string
      message: string
      receiver: string[]
      isRead: boolean
      taskId: string | null
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly sender: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly receiver: FieldRef<"Notification", 'String[]'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly taskId: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ColumnScalarFieldEnum: {
    id: 'id',
    title: 'title',
    order: 'order'
  };

  export type ColumnScalarFieldEnum = (typeof ColumnScalarFieldEnum)[keyof typeof ColumnScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    content: 'content',
    price: 'price',
    phone: 'phone',
    email: 'email',
    description: 'description',
    source: 'source',
    assignedTo: 'assignedTo',
    visaType: 'visaType',
    passportNumber: 'passportNumber',
    maritalStatus: 'maritalStatus',
    dependents: 'dependents',
    priorityDate: 'priorityDate',
    educationLevel: 'educationLevel',
    englishScore: 'englishScore',
    workExperience: 'workExperience',
    jobType: 'jobType',
    checklistType: 'checklistType',
    columnId: 'columnId',
    createdAt: 'createdAt',
    documents: 'documents',
    processingColId: 'processingColId',
    commissionPaid: 'commissionPaid',
    recruitmentStep: 'recruitmentStep'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    completed: 'completed',
    type: 'type',
    summary: 'summary',
    assignee: 'assignee',
    status: 'status',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    dueText: 'dueText',
    createdAt: 'createdAt',
    jobType: 'jobType',
    taskId: 'taskId'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const DocFolderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    createdAt: 'createdAt'
  };

  export type DocFolderScalarFieldEnum = (typeof DocFolderScalarFieldEnum)[keyof typeof DocFolderScalarFieldEnum]


  export const DocFileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    size: 'size',
    fileUrl: 'fileUrl',
    uploadedBy: 'uploadedBy',
    createdAt: 'createdAt',
    cloudinaryPublicId: 'cloudinaryPublicId',
    folderId: 'folderId'
  };

  export type DocFileScalarFieldEnum = (typeof DocFileScalarFieldEnum)[keyof typeof DocFileScalarFieldEnum]


  export const ProcessedFolderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    createdAt: 'createdAt'
  };

  export type ProcessedFolderScalarFieldEnum = (typeof ProcessedFolderScalarFieldEnum)[keyof typeof ProcessedFolderScalarFieldEnum]


  export const ProcessedFileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    size: 'size',
    fileUrl: 'fileUrl',
    uploadedBy: 'uploadedBy',
    createdAt: 'createdAt',
    cloudinaryPublicId: 'cloudinaryPublicId',
    folderId: 'folderId'
  };

  export type ProcessedFileScalarFieldEnum = (typeof ProcessedFileScalarFieldEnum)[keyof typeof ProcessedFileScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    sender: 'sender',
    message: 'message',
    receiver: 'receiver',
    isRead: 'isRead',
    taskId: 'taskId',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ColumnWhereInput = {
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    id?: StringFilter<"Column"> | string
    title?: StringFilter<"Column"> | string
    order?: IntFilter<"Column"> | number
    tasks?: TaskListRelationFilter
  }

  export type ColumnOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    order?: SortOrder
    tasks?: TaskOrderByRelationAggregateInput
  }

  export type ColumnWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ColumnWhereInput | ColumnWhereInput[]
    OR?: ColumnWhereInput[]
    NOT?: ColumnWhereInput | ColumnWhereInput[]
    title?: StringFilter<"Column"> | string
    order?: IntFilter<"Column"> | number
    tasks?: TaskListRelationFilter
  }, "id">

  export type ColumnOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    order?: SortOrder
    _count?: ColumnCountOrderByAggregateInput
    _avg?: ColumnAvgOrderByAggregateInput
    _max?: ColumnMaxOrderByAggregateInput
    _min?: ColumnMinOrderByAggregateInput
    _sum?: ColumnSumOrderByAggregateInput
  }

  export type ColumnScalarWhereWithAggregatesInput = {
    AND?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    OR?: ColumnScalarWhereWithAggregatesInput[]
    NOT?: ColumnScalarWhereWithAggregatesInput | ColumnScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Column"> | string
    title?: StringWithAggregatesFilter<"Column"> | string
    order?: IntWithAggregatesFilter<"Column"> | number
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: StringFilter<"Task"> | string
    content?: StringFilter<"Task"> | string
    price?: StringFilter<"Task"> | string
    phone?: StringFilter<"Task"> | string
    email?: StringNullableFilter<"Task"> | string | null
    description?: StringNullableFilter<"Task"> | string | null
    source?: StringNullableFilter<"Task"> | string | null
    assignedTo?: StringFilter<"Task"> | string
    visaType?: StringNullableFilter<"Task"> | string | null
    passportNumber?: StringNullableFilter<"Task"> | string | null
    maritalStatus?: StringNullableFilter<"Task"> | string | null
    dependents?: IntNullableFilter<"Task"> | number | null
    priorityDate?: StringNullableFilter<"Task"> | string | null
    educationLevel?: StringNullableFilter<"Task"> | string | null
    englishScore?: StringNullableFilter<"Task"> | string | null
    workExperience?: StringNullableFilter<"Task"> | string | null
    jobType?: StringNullableFilter<"Task"> | string | null
    checklistType?: StringNullableFilter<"Task"> | string | null
    columnId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    documents?: JsonNullableFilter<"Task">
    processingColId?: StringFilter<"Task"> | string
    commissionPaid?: BoolFilter<"Task"> | boolean
    recruitmentStep?: StringNullableFilter<"Task"> | string | null
    column?: XOR<ColumnNullableScalarRelationFilter, ColumnWhereInput> | null
    activities?: ActivityListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    price?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    assignedTo?: SortOrder
    visaType?: SortOrderInput | SortOrder
    passportNumber?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    dependents?: SortOrderInput | SortOrder
    priorityDate?: SortOrderInput | SortOrder
    educationLevel?: SortOrderInput | SortOrder
    englishScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    checklistType?: SortOrderInput | SortOrder
    columnId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    documents?: SortOrderInput | SortOrder
    processingColId?: SortOrder
    commissionPaid?: SortOrder
    recruitmentStep?: SortOrderInput | SortOrder
    column?: ColumnOrderByWithRelationInput
    activities?: ActivityOrderByRelationAggregateInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    content?: StringFilter<"Task"> | string
    price?: StringFilter<"Task"> | string
    phone?: StringFilter<"Task"> | string
    email?: StringNullableFilter<"Task"> | string | null
    description?: StringNullableFilter<"Task"> | string | null
    source?: StringNullableFilter<"Task"> | string | null
    assignedTo?: StringFilter<"Task"> | string
    visaType?: StringNullableFilter<"Task"> | string | null
    passportNumber?: StringNullableFilter<"Task"> | string | null
    maritalStatus?: StringNullableFilter<"Task"> | string | null
    dependents?: IntNullableFilter<"Task"> | number | null
    priorityDate?: StringNullableFilter<"Task"> | string | null
    educationLevel?: StringNullableFilter<"Task"> | string | null
    englishScore?: StringNullableFilter<"Task"> | string | null
    workExperience?: StringNullableFilter<"Task"> | string | null
    jobType?: StringNullableFilter<"Task"> | string | null
    checklistType?: StringNullableFilter<"Task"> | string | null
    columnId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    documents?: JsonNullableFilter<"Task">
    processingColId?: StringFilter<"Task"> | string
    commissionPaid?: BoolFilter<"Task"> | boolean
    recruitmentStep?: StringNullableFilter<"Task"> | string | null
    column?: XOR<ColumnNullableScalarRelationFilter, ColumnWhereInput> | null
    activities?: ActivityListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    price?: SortOrder
    phone?: SortOrder
    email?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    assignedTo?: SortOrder
    visaType?: SortOrderInput | SortOrder
    passportNumber?: SortOrderInput | SortOrder
    maritalStatus?: SortOrderInput | SortOrder
    dependents?: SortOrderInput | SortOrder
    priorityDate?: SortOrderInput | SortOrder
    educationLevel?: SortOrderInput | SortOrder
    englishScore?: SortOrderInput | SortOrder
    workExperience?: SortOrderInput | SortOrder
    jobType?: SortOrderInput | SortOrder
    checklistType?: SortOrderInput | SortOrder
    columnId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    documents?: SortOrderInput | SortOrder
    processingColId?: SortOrder
    commissionPaid?: SortOrder
    recruitmentStep?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Task"> | string
    content?: StringWithAggregatesFilter<"Task"> | string
    price?: StringWithAggregatesFilter<"Task"> | string
    phone?: StringWithAggregatesFilter<"Task"> | string
    email?: StringNullableWithAggregatesFilter<"Task"> | string | null
    description?: StringNullableWithAggregatesFilter<"Task"> | string | null
    source?: StringNullableWithAggregatesFilter<"Task"> | string | null
    assignedTo?: StringWithAggregatesFilter<"Task"> | string
    visaType?: StringNullableWithAggregatesFilter<"Task"> | string | null
    passportNumber?: StringNullableWithAggregatesFilter<"Task"> | string | null
    maritalStatus?: StringNullableWithAggregatesFilter<"Task"> | string | null
    dependents?: IntNullableWithAggregatesFilter<"Task"> | number | null
    priorityDate?: StringNullableWithAggregatesFilter<"Task"> | string | null
    educationLevel?: StringNullableWithAggregatesFilter<"Task"> | string | null
    englishScore?: StringNullableWithAggregatesFilter<"Task"> | string | null
    workExperience?: StringNullableWithAggregatesFilter<"Task"> | string | null
    jobType?: StringNullableWithAggregatesFilter<"Task"> | string | null
    checklistType?: StringNullableWithAggregatesFilter<"Task"> | string | null
    columnId?: StringNullableWithAggregatesFilter<"Task"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    documents?: JsonNullableWithAggregatesFilter<"Task">
    processingColId?: StringWithAggregatesFilter<"Task"> | string
    commissionPaid?: BoolWithAggregatesFilter<"Task"> | boolean
    recruitmentStep?: StringNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    completed?: BoolFilter<"Activity"> | boolean
    type?: StringFilter<"Activity"> | string
    summary?: StringFilter<"Activity"> | string
    assignee?: StringFilter<"Activity"> | string
    status?: StringFilter<"Activity"> | string
    fileName?: StringNullableFilter<"Activity"> | string | null
    fileUrl?: StringNullableFilter<"Activity"> | string | null
    dueText?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    jobType?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringFilter<"Activity"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    completed?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    assignee?: SortOrder
    status?: SortOrder
    fileName?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    dueText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    jobType?: SortOrderInput | SortOrder
    taskId?: SortOrder
    task?: TaskOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    completed?: BoolFilter<"Activity"> | boolean
    type?: StringFilter<"Activity"> | string
    summary?: StringFilter<"Activity"> | string
    assignee?: StringFilter<"Activity"> | string
    status?: StringFilter<"Activity"> | string
    fileName?: StringNullableFilter<"Activity"> | string | null
    fileUrl?: StringNullableFilter<"Activity"> | string | null
    dueText?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    jobType?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringFilter<"Activity"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    completed?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    assignee?: SortOrder
    status?: SortOrder
    fileName?: SortOrderInput | SortOrder
    fileUrl?: SortOrderInput | SortOrder
    dueText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    jobType?: SortOrderInput | SortOrder
    taskId?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    completed?: BoolWithAggregatesFilter<"Activity"> | boolean
    type?: StringWithAggregatesFilter<"Activity"> | string
    summary?: StringWithAggregatesFilter<"Activity"> | string
    assignee?: StringWithAggregatesFilter<"Activity"> | string
    status?: StringWithAggregatesFilter<"Activity"> | string
    fileName?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    fileUrl?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    dueText?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    jobType?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    taskId?: StringWithAggregatesFilter<"Activity"> | string
  }

  export type DocFolderWhereInput = {
    AND?: DocFolderWhereInput | DocFolderWhereInput[]
    OR?: DocFolderWhereInput[]
    NOT?: DocFolderWhereInput | DocFolderWhereInput[]
    id?: StringFilter<"DocFolder"> | string
    name?: StringFilter<"DocFolder"> | string
    parentId?: StringNullableFilter<"DocFolder"> | string | null
    createdAt?: DateTimeFilter<"DocFolder"> | Date | string
    files?: DocFileListRelationFilter
  }

  export type DocFolderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    files?: DocFileOrderByRelationAggregateInput
  }

  export type DocFolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocFolderWhereInput | DocFolderWhereInput[]
    OR?: DocFolderWhereInput[]
    NOT?: DocFolderWhereInput | DocFolderWhereInput[]
    name?: StringFilter<"DocFolder"> | string
    parentId?: StringNullableFilter<"DocFolder"> | string | null
    createdAt?: DateTimeFilter<"DocFolder"> | Date | string
    files?: DocFileListRelationFilter
  }, "id">

  export type DocFolderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DocFolderCountOrderByAggregateInput
    _max?: DocFolderMaxOrderByAggregateInput
    _min?: DocFolderMinOrderByAggregateInput
  }

  export type DocFolderScalarWhereWithAggregatesInput = {
    AND?: DocFolderScalarWhereWithAggregatesInput | DocFolderScalarWhereWithAggregatesInput[]
    OR?: DocFolderScalarWhereWithAggregatesInput[]
    NOT?: DocFolderScalarWhereWithAggregatesInput | DocFolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocFolder"> | string
    name?: StringWithAggregatesFilter<"DocFolder"> | string
    parentId?: StringNullableWithAggregatesFilter<"DocFolder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocFolder"> | Date | string
  }

  export type DocFileWhereInput = {
    AND?: DocFileWhereInput | DocFileWhereInput[]
    OR?: DocFileWhereInput[]
    NOT?: DocFileWhereInput | DocFileWhereInput[]
    id?: StringFilter<"DocFile"> | string
    name?: StringFilter<"DocFile"> | string
    size?: StringFilter<"DocFile"> | string
    fileUrl?: StringFilter<"DocFile"> | string
    uploadedBy?: StringFilter<"DocFile"> | string
    createdAt?: DateTimeFilter<"DocFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"DocFile"> | string | null
    folderId?: StringNullableFilter<"DocFile"> | string | null
    folder?: XOR<DocFolderNullableScalarRelationFilter, DocFolderWhereInput> | null
  }

  export type DocFileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    folder?: DocFolderOrderByWithRelationInput
  }

  export type DocFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocFileWhereInput | DocFileWhereInput[]
    OR?: DocFileWhereInput[]
    NOT?: DocFileWhereInput | DocFileWhereInput[]
    name?: StringFilter<"DocFile"> | string
    size?: StringFilter<"DocFile"> | string
    fileUrl?: StringFilter<"DocFile"> | string
    uploadedBy?: StringFilter<"DocFile"> | string
    createdAt?: DateTimeFilter<"DocFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"DocFile"> | string | null
    folderId?: StringNullableFilter<"DocFile"> | string | null
    folder?: XOR<DocFolderNullableScalarRelationFilter, DocFolderWhereInput> | null
  }, "id">

  export type DocFileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    _count?: DocFileCountOrderByAggregateInput
    _max?: DocFileMaxOrderByAggregateInput
    _min?: DocFileMinOrderByAggregateInput
  }

  export type DocFileScalarWhereWithAggregatesInput = {
    AND?: DocFileScalarWhereWithAggregatesInput | DocFileScalarWhereWithAggregatesInput[]
    OR?: DocFileScalarWhereWithAggregatesInput[]
    NOT?: DocFileScalarWhereWithAggregatesInput | DocFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocFile"> | string
    name?: StringWithAggregatesFilter<"DocFile"> | string
    size?: StringWithAggregatesFilter<"DocFile"> | string
    fileUrl?: StringWithAggregatesFilter<"DocFile"> | string
    uploadedBy?: StringWithAggregatesFilter<"DocFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"DocFile"> | Date | string
    cloudinaryPublicId?: StringNullableWithAggregatesFilter<"DocFile"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"DocFile"> | string | null
  }

  export type ProcessedFolderWhereInput = {
    AND?: ProcessedFolderWhereInput | ProcessedFolderWhereInput[]
    OR?: ProcessedFolderWhereInput[]
    NOT?: ProcessedFolderWhereInput | ProcessedFolderWhereInput[]
    id?: StringFilter<"ProcessedFolder"> | string
    name?: StringFilter<"ProcessedFolder"> | string
    parentId?: StringNullableFilter<"ProcessedFolder"> | string | null
    createdAt?: DateTimeFilter<"ProcessedFolder"> | Date | string
    files?: ProcessedFileListRelationFilter
  }

  export type ProcessedFolderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    files?: ProcessedFileOrderByRelationAggregateInput
  }

  export type ProcessedFolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProcessedFolderWhereInput | ProcessedFolderWhereInput[]
    OR?: ProcessedFolderWhereInput[]
    NOT?: ProcessedFolderWhereInput | ProcessedFolderWhereInput[]
    name?: StringFilter<"ProcessedFolder"> | string
    parentId?: StringNullableFilter<"ProcessedFolder"> | string | null
    createdAt?: DateTimeFilter<"ProcessedFolder"> | Date | string
    files?: ProcessedFileListRelationFilter
  }, "id">

  export type ProcessedFolderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ProcessedFolderCountOrderByAggregateInput
    _max?: ProcessedFolderMaxOrderByAggregateInput
    _min?: ProcessedFolderMinOrderByAggregateInput
  }

  export type ProcessedFolderScalarWhereWithAggregatesInput = {
    AND?: ProcessedFolderScalarWhereWithAggregatesInput | ProcessedFolderScalarWhereWithAggregatesInput[]
    OR?: ProcessedFolderScalarWhereWithAggregatesInput[]
    NOT?: ProcessedFolderScalarWhereWithAggregatesInput | ProcessedFolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessedFolder"> | string
    name?: StringWithAggregatesFilter<"ProcessedFolder"> | string
    parentId?: StringNullableWithAggregatesFilter<"ProcessedFolder"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ProcessedFolder"> | Date | string
  }

  export type ProcessedFileWhereInput = {
    AND?: ProcessedFileWhereInput | ProcessedFileWhereInput[]
    OR?: ProcessedFileWhereInput[]
    NOT?: ProcessedFileWhereInput | ProcessedFileWhereInput[]
    id?: StringFilter<"ProcessedFile"> | string
    name?: StringFilter<"ProcessedFile"> | string
    size?: StringFilter<"ProcessedFile"> | string
    fileUrl?: StringFilter<"ProcessedFile"> | string
    uploadedBy?: StringFilter<"ProcessedFile"> | string
    createdAt?: DateTimeFilter<"ProcessedFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"ProcessedFile"> | string | null
    folderId?: StringNullableFilter<"ProcessedFile"> | string | null
    folder?: XOR<ProcessedFolderNullableScalarRelationFilter, ProcessedFolderWhereInput> | null
  }

  export type ProcessedFileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    folder?: ProcessedFolderOrderByWithRelationInput
  }

  export type ProcessedFileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProcessedFileWhereInput | ProcessedFileWhereInput[]
    OR?: ProcessedFileWhereInput[]
    NOT?: ProcessedFileWhereInput | ProcessedFileWhereInput[]
    name?: StringFilter<"ProcessedFile"> | string
    size?: StringFilter<"ProcessedFile"> | string
    fileUrl?: StringFilter<"ProcessedFile"> | string
    uploadedBy?: StringFilter<"ProcessedFile"> | string
    createdAt?: DateTimeFilter<"ProcessedFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"ProcessedFile"> | string | null
    folderId?: StringNullableFilter<"ProcessedFile"> | string | null
    folder?: XOR<ProcessedFolderNullableScalarRelationFilter, ProcessedFolderWhereInput> | null
  }, "id">

  export type ProcessedFileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    _count?: ProcessedFileCountOrderByAggregateInput
    _max?: ProcessedFileMaxOrderByAggregateInput
    _min?: ProcessedFileMinOrderByAggregateInput
  }

  export type ProcessedFileScalarWhereWithAggregatesInput = {
    AND?: ProcessedFileScalarWhereWithAggregatesInput | ProcessedFileScalarWhereWithAggregatesInput[]
    OR?: ProcessedFileScalarWhereWithAggregatesInput[]
    NOT?: ProcessedFileScalarWhereWithAggregatesInput | ProcessedFileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessedFile"> | string
    name?: StringWithAggregatesFilter<"ProcessedFile"> | string
    size?: StringWithAggregatesFilter<"ProcessedFile"> | string
    fileUrl?: StringWithAggregatesFilter<"ProcessedFile"> | string
    uploadedBy?: StringWithAggregatesFilter<"ProcessedFile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProcessedFile"> | Date | string
    cloudinaryPublicId?: StringNullableWithAggregatesFilter<"ProcessedFile"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"ProcessedFile"> | string | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    sender?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    receiver?: StringNullableListFilter<"Notification">
    isRead?: BoolFilter<"Notification"> | boolean
    taskId?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    receiver?: SortOrder
    isRead?: SortOrder
    taskId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    sender?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    receiver?: StringNullableListFilter<"Notification">
    isRead?: BoolFilter<"Notification"> | boolean
    taskId?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    receiver?: SortOrder
    isRead?: SortOrder
    taskId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    sender?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    receiver?: StringNullableListFilter<"Notification">
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    taskId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type ColumnCreateInput = {
    id: string
    title: string
    order: number
    tasks?: TaskCreateNestedManyWithoutColumnInput
  }

  export type ColumnUncheckedCreateInput = {
    id: string
    title: string
    order: number
    tasks?: TaskUncheckedCreateNestedManyWithoutColumnInput
  }

  export type ColumnUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    tasks?: TaskUpdateManyWithoutColumnNestedInput
  }

  export type ColumnUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    tasks?: TaskUncheckedUpdateManyWithoutColumnNestedInput
  }

  export type ColumnCreateManyInput = {
    id: string
    title: string
    order: number
  }

  export type ColumnUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColumnUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TaskCreateInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
    column?: ColumnCreateNestedOneWithoutTasksInput
    activities?: ActivityCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    columnId?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
    column?: ColumnUpdateOneWithoutTasksNestedInput
    activities?: ActivityUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    columnId?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
    task: TaskCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
    taskId: string
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    task?: TaskUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityCreateManyInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
    taskId: string
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type DocFolderCreateInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
    files?: DocFileCreateNestedManyWithoutFolderInput
  }

  export type DocFolderUncheckedCreateInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
    files?: DocFileUncheckedCreateNestedManyWithoutFolderInput
  }

  export type DocFolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: DocFileUpdateManyWithoutFolderNestedInput
  }

  export type DocFolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: DocFileUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type DocFolderCreateManyInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type DocFolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocFolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocFileCreateInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folder?: DocFolderCreateNestedOneWithoutFilesInput
  }

  export type DocFileUncheckedCreateInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folderId?: string | null
  }

  export type DocFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folder?: DocFolderUpdateOneWithoutFilesNestedInput
  }

  export type DocFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileCreateManyInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folderId?: string | null
  }

  export type DocFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFolderCreateInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
    files?: ProcessedFileCreateNestedManyWithoutFolderInput
  }

  export type ProcessedFolderUncheckedCreateInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
    files?: ProcessedFileUncheckedCreateNestedManyWithoutFolderInput
  }

  export type ProcessedFolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: ProcessedFileUpdateManyWithoutFolderNestedInput
  }

  export type ProcessedFolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    files?: ProcessedFileUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type ProcessedFolderCreateManyInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type ProcessedFolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedFolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedFileCreateInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folder?: ProcessedFolderCreateNestedOneWithoutFilesInput
  }

  export type ProcessedFileUncheckedCreateInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folderId?: string | null
  }

  export type ProcessedFileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folder?: ProcessedFolderUpdateOneWithoutFilesNestedInput
  }

  export type ProcessedFileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFileCreateManyInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
    folderId?: string | null
  }

  export type ProcessedFileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NotificationCreateInput = {
    id?: string
    sender: string
    message: string
    receiver?: NotificationCreatereceiverInput | string[]
    isRead?: boolean
    taskId?: string | null
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    sender: string
    message: string
    receiver?: NotificationCreatereceiverInput | string[]
    isRead?: boolean
    taskId?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    receiver?: NotificationUpdatereceiverInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    receiver?: NotificationUpdatereceiverInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    sender: string
    message: string
    receiver?: NotificationCreatereceiverInput | string[]
    isRead?: boolean
    taskId?: string | null
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    receiver?: NotificationUpdatereceiverInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    receiver?: NotificationUpdatereceiverInput | string[]
    isRead?: BoolFieldUpdateOperationsInput | boolean
    taskId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ColumnCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    order?: SortOrder
  }

  export type ColumnAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ColumnMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    order?: SortOrder
  }

  export type ColumnMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    order?: SortOrder
  }

  export type ColumnSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ColumnNullableScalarRelationFilter = {
    is?: ColumnWhereInput | null
    isNot?: ColumnWhereInput | null
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    price?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    source?: SortOrder
    assignedTo?: SortOrder
    visaType?: SortOrder
    passportNumber?: SortOrder
    maritalStatus?: SortOrder
    dependents?: SortOrder
    priorityDate?: SortOrder
    educationLevel?: SortOrder
    englishScore?: SortOrder
    workExperience?: SortOrder
    jobType?: SortOrder
    checklistType?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    documents?: SortOrder
    processingColId?: SortOrder
    commissionPaid?: SortOrder
    recruitmentStep?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    dependents?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    price?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    source?: SortOrder
    assignedTo?: SortOrder
    visaType?: SortOrder
    passportNumber?: SortOrder
    maritalStatus?: SortOrder
    dependents?: SortOrder
    priorityDate?: SortOrder
    educationLevel?: SortOrder
    englishScore?: SortOrder
    workExperience?: SortOrder
    jobType?: SortOrder
    checklistType?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    processingColId?: SortOrder
    commissionPaid?: SortOrder
    recruitmentStep?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    price?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    description?: SortOrder
    source?: SortOrder
    assignedTo?: SortOrder
    visaType?: SortOrder
    passportNumber?: SortOrder
    maritalStatus?: SortOrder
    dependents?: SortOrder
    priorityDate?: SortOrder
    educationLevel?: SortOrder
    englishScore?: SortOrder
    workExperience?: SortOrder
    jobType?: SortOrder
    checklistType?: SortOrder
    columnId?: SortOrder
    createdAt?: SortOrder
    processingColId?: SortOrder
    commissionPaid?: SortOrder
    recruitmentStep?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    dependents?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    assignee?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    dueText?: SortOrder
    createdAt?: SortOrder
    jobType?: SortOrder
    taskId?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    assignee?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    dueText?: SortOrder
    createdAt?: SortOrder
    jobType?: SortOrder
    taskId?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    completed?: SortOrder
    type?: SortOrder
    summary?: SortOrder
    assignee?: SortOrder
    status?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    dueText?: SortOrder
    createdAt?: SortOrder
    jobType?: SortOrder
    taskId?: SortOrder
  }

  export type DocFileListRelationFilter = {
    every?: DocFileWhereInput
    some?: DocFileWhereInput
    none?: DocFileWhereInput
  }

  export type DocFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocFolderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocFolderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocFolderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type DocFolderNullableScalarRelationFilter = {
    is?: DocFolderWhereInput | null
    isNot?: DocFolderWhereInput | null
  }

  export type DocFileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type DocFileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type DocFileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type ProcessedFileListRelationFilter = {
    every?: ProcessedFileWhereInput
    some?: ProcessedFileWhereInput
    none?: ProcessedFileWhereInput
  }

  export type ProcessedFileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProcessedFolderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedFolderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedFolderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessedFolderNullableScalarRelationFilter = {
    is?: ProcessedFolderWhereInput | null
    isNot?: ProcessedFolderWhereInput | null
  }

  export type ProcessedFileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type ProcessedFileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type ProcessedFileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    size?: SortOrder
    fileUrl?: SortOrder
    uploadedBy?: SortOrder
    createdAt?: SortOrder
    cloudinaryPublicId?: SortOrder
    folderId?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    receiver?: SortOrder
    isRead?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    taskId?: SortOrder
    createdAt?: SortOrder
  }

  export type TaskCreateNestedManyWithoutColumnInput = {
    create?: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput> | TaskCreateWithoutColumnInput[] | TaskUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[]
    createMany?: TaskCreateManyColumnInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutColumnInput = {
    create?: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput> | TaskCreateWithoutColumnInput[] | TaskUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[]
    createMany?: TaskCreateManyColumnInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TaskUpdateManyWithoutColumnNestedInput = {
    create?: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput> | TaskCreateWithoutColumnInput[] | TaskUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutColumnInput | TaskUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: TaskCreateManyColumnInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutColumnInput | TaskUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutColumnInput | TaskUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutColumnNestedInput = {
    create?: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput> | TaskCreateWithoutColumnInput[] | TaskUncheckedCreateWithoutColumnInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutColumnInput | TaskCreateOrConnectWithoutColumnInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutColumnInput | TaskUpsertWithWhereUniqueWithoutColumnInput[]
    createMany?: TaskCreateManyColumnInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutColumnInput | TaskUpdateWithWhereUniqueWithoutColumnInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutColumnInput | TaskUpdateManyWithWhereWithoutColumnInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ColumnCreateNestedOneWithoutTasksInput = {
    create?: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutTasksInput
    connect?: ColumnWhereUniqueInput
  }

  export type ActivityCreateNestedManyWithoutTaskInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ColumnUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ColumnCreateOrConnectWithoutTasksInput
    upsert?: ColumnUpsertWithoutTasksInput
    disconnect?: ColumnWhereInput | boolean
    delete?: ColumnWhereInput | boolean
    connect?: ColumnWhereUniqueInput
    update?: XOR<XOR<ColumnUpdateToOneWithWhereWithoutTasksInput, ColumnUpdateWithoutTasksInput>, ColumnUncheckedUpdateWithoutTasksInput>
  }

  export type ActivityUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutTaskInput | ActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutTaskInput | ActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutTaskInput | ActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput> | ActivityCreateWithoutTaskInput[] | ActivityUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutTaskInput | ActivityCreateOrConnectWithoutTaskInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutTaskInput | ActivityUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ActivityCreateManyTaskInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutTaskInput | ActivityUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutTaskInput | ActivityUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutActivitiesInput
    upsert?: TaskUpsertWithoutActivitiesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutActivitiesInput, TaskUpdateWithoutActivitiesInput>, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type DocFileCreateNestedManyWithoutFolderInput = {
    create?: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput> | DocFileCreateWithoutFolderInput[] | DocFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocFileCreateOrConnectWithoutFolderInput | DocFileCreateOrConnectWithoutFolderInput[]
    createMany?: DocFileCreateManyFolderInputEnvelope
    connect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
  }

  export type DocFileUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput> | DocFileCreateWithoutFolderInput[] | DocFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocFileCreateOrConnectWithoutFolderInput | DocFileCreateOrConnectWithoutFolderInput[]
    createMany?: DocFileCreateManyFolderInputEnvelope
    connect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
  }

  export type DocFileUpdateManyWithoutFolderNestedInput = {
    create?: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput> | DocFileCreateWithoutFolderInput[] | DocFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocFileCreateOrConnectWithoutFolderInput | DocFileCreateOrConnectWithoutFolderInput[]
    upsert?: DocFileUpsertWithWhereUniqueWithoutFolderInput | DocFileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: DocFileCreateManyFolderInputEnvelope
    set?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    disconnect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    delete?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    connect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    update?: DocFileUpdateWithWhereUniqueWithoutFolderInput | DocFileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: DocFileUpdateManyWithWhereWithoutFolderInput | DocFileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: DocFileScalarWhereInput | DocFileScalarWhereInput[]
  }

  export type DocFileUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput> | DocFileCreateWithoutFolderInput[] | DocFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: DocFileCreateOrConnectWithoutFolderInput | DocFileCreateOrConnectWithoutFolderInput[]
    upsert?: DocFileUpsertWithWhereUniqueWithoutFolderInput | DocFileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: DocFileCreateManyFolderInputEnvelope
    set?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    disconnect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    delete?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    connect?: DocFileWhereUniqueInput | DocFileWhereUniqueInput[]
    update?: DocFileUpdateWithWhereUniqueWithoutFolderInput | DocFileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: DocFileUpdateManyWithWhereWithoutFolderInput | DocFileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: DocFileScalarWhereInput | DocFileScalarWhereInput[]
  }

  export type DocFolderCreateNestedOneWithoutFilesInput = {
    create?: XOR<DocFolderCreateWithoutFilesInput, DocFolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: DocFolderCreateOrConnectWithoutFilesInput
    connect?: DocFolderWhereUniqueInput
  }

  export type DocFolderUpdateOneWithoutFilesNestedInput = {
    create?: XOR<DocFolderCreateWithoutFilesInput, DocFolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: DocFolderCreateOrConnectWithoutFilesInput
    upsert?: DocFolderUpsertWithoutFilesInput
    disconnect?: DocFolderWhereInput | boolean
    delete?: DocFolderWhereInput | boolean
    connect?: DocFolderWhereUniqueInput
    update?: XOR<XOR<DocFolderUpdateToOneWithWhereWithoutFilesInput, DocFolderUpdateWithoutFilesInput>, DocFolderUncheckedUpdateWithoutFilesInput>
  }

  export type ProcessedFileCreateNestedManyWithoutFolderInput = {
    create?: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput> | ProcessedFileCreateWithoutFolderInput[] | ProcessedFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ProcessedFileCreateOrConnectWithoutFolderInput | ProcessedFileCreateOrConnectWithoutFolderInput[]
    createMany?: ProcessedFileCreateManyFolderInputEnvelope
    connect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
  }

  export type ProcessedFileUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput> | ProcessedFileCreateWithoutFolderInput[] | ProcessedFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ProcessedFileCreateOrConnectWithoutFolderInput | ProcessedFileCreateOrConnectWithoutFolderInput[]
    createMany?: ProcessedFileCreateManyFolderInputEnvelope
    connect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
  }

  export type ProcessedFileUpdateManyWithoutFolderNestedInput = {
    create?: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput> | ProcessedFileCreateWithoutFolderInput[] | ProcessedFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ProcessedFileCreateOrConnectWithoutFolderInput | ProcessedFileCreateOrConnectWithoutFolderInput[]
    upsert?: ProcessedFileUpsertWithWhereUniqueWithoutFolderInput | ProcessedFileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: ProcessedFileCreateManyFolderInputEnvelope
    set?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    disconnect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    delete?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    connect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    update?: ProcessedFileUpdateWithWhereUniqueWithoutFolderInput | ProcessedFileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: ProcessedFileUpdateManyWithWhereWithoutFolderInput | ProcessedFileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: ProcessedFileScalarWhereInput | ProcessedFileScalarWhereInput[]
  }

  export type ProcessedFileUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput> | ProcessedFileCreateWithoutFolderInput[] | ProcessedFileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ProcessedFileCreateOrConnectWithoutFolderInput | ProcessedFileCreateOrConnectWithoutFolderInput[]
    upsert?: ProcessedFileUpsertWithWhereUniqueWithoutFolderInput | ProcessedFileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: ProcessedFileCreateManyFolderInputEnvelope
    set?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    disconnect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    delete?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    connect?: ProcessedFileWhereUniqueInput | ProcessedFileWhereUniqueInput[]
    update?: ProcessedFileUpdateWithWhereUniqueWithoutFolderInput | ProcessedFileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: ProcessedFileUpdateManyWithWhereWithoutFolderInput | ProcessedFileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: ProcessedFileScalarWhereInput | ProcessedFileScalarWhereInput[]
  }

  export type ProcessedFolderCreateNestedOneWithoutFilesInput = {
    create?: XOR<ProcessedFolderCreateWithoutFilesInput, ProcessedFolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: ProcessedFolderCreateOrConnectWithoutFilesInput
    connect?: ProcessedFolderWhereUniqueInput
  }

  export type ProcessedFolderUpdateOneWithoutFilesNestedInput = {
    create?: XOR<ProcessedFolderCreateWithoutFilesInput, ProcessedFolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: ProcessedFolderCreateOrConnectWithoutFilesInput
    upsert?: ProcessedFolderUpsertWithoutFilesInput
    disconnect?: ProcessedFolderWhereInput | boolean
    delete?: ProcessedFolderWhereInput | boolean
    connect?: ProcessedFolderWhereUniqueInput
    update?: XOR<XOR<ProcessedFolderUpdateToOneWithWhereWithoutFilesInput, ProcessedFolderUpdateWithoutFilesInput>, ProcessedFolderUncheckedUpdateWithoutFilesInput>
  }

  export type NotificationCreatereceiverInput = {
    set: string[]
  }

  export type NotificationUpdatereceiverInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TaskCreateWithoutColumnInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
    activities?: ActivityCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutColumnInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutColumnInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
  }

  export type TaskCreateManyColumnInputEnvelope = {
    data: TaskCreateManyColumnInput | TaskCreateManyColumnInput[]
    skipDuplicates?: boolean
  }

  export type TaskUpsertWithWhereUniqueWithoutColumnInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutColumnInput, TaskUncheckedUpdateWithoutColumnInput>
    create: XOR<TaskCreateWithoutColumnInput, TaskUncheckedCreateWithoutColumnInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutColumnInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutColumnInput, TaskUncheckedUpdateWithoutColumnInput>
  }

  export type TaskUpdateManyWithWhereWithoutColumnInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutColumnInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: StringFilter<"Task"> | string
    content?: StringFilter<"Task"> | string
    price?: StringFilter<"Task"> | string
    phone?: StringFilter<"Task"> | string
    email?: StringNullableFilter<"Task"> | string | null
    description?: StringNullableFilter<"Task"> | string | null
    source?: StringNullableFilter<"Task"> | string | null
    assignedTo?: StringFilter<"Task"> | string
    visaType?: StringNullableFilter<"Task"> | string | null
    passportNumber?: StringNullableFilter<"Task"> | string | null
    maritalStatus?: StringNullableFilter<"Task"> | string | null
    dependents?: IntNullableFilter<"Task"> | number | null
    priorityDate?: StringNullableFilter<"Task"> | string | null
    educationLevel?: StringNullableFilter<"Task"> | string | null
    englishScore?: StringNullableFilter<"Task"> | string | null
    workExperience?: StringNullableFilter<"Task"> | string | null
    jobType?: StringNullableFilter<"Task"> | string | null
    checklistType?: StringNullableFilter<"Task"> | string | null
    columnId?: StringNullableFilter<"Task"> | string | null
    createdAt?: DateTimeFilter<"Task"> | Date | string
    documents?: JsonNullableFilter<"Task">
    processingColId?: StringFilter<"Task"> | string
    commissionPaid?: BoolFilter<"Task"> | boolean
    recruitmentStep?: StringNullableFilter<"Task"> | string | null
  }

  export type ColumnCreateWithoutTasksInput = {
    id: string
    title: string
    order: number
  }

  export type ColumnUncheckedCreateWithoutTasksInput = {
    id: string
    title: string
    order: number
  }

  export type ColumnCreateOrConnectWithoutTasksInput = {
    where: ColumnWhereUniqueInput
    create: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>
  }

  export type ActivityCreateWithoutTaskInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
  }

  export type ActivityUncheckedCreateWithoutTaskInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
  }

  export type ActivityCreateOrConnectWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput>
  }

  export type ActivityCreateManyTaskInputEnvelope = {
    data: ActivityCreateManyTaskInput | ActivityCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type ColumnUpsertWithoutTasksInput = {
    update: XOR<ColumnUpdateWithoutTasksInput, ColumnUncheckedUpdateWithoutTasksInput>
    create: XOR<ColumnCreateWithoutTasksInput, ColumnUncheckedCreateWithoutTasksInput>
    where?: ColumnWhereInput
  }

  export type ColumnUpdateToOneWithWhereWithoutTasksInput = {
    where?: ColumnWhereInput
    data: XOR<ColumnUpdateWithoutTasksInput, ColumnUncheckedUpdateWithoutTasksInput>
  }

  export type ColumnUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ColumnUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityUpsertWithWhereUniqueWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutTaskInput, ActivityUncheckedUpdateWithoutTaskInput>
    create: XOR<ActivityCreateWithoutTaskInput, ActivityUncheckedCreateWithoutTaskInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutTaskInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutTaskInput, ActivityUncheckedUpdateWithoutTaskInput>
  }

  export type ActivityUpdateManyWithWhereWithoutTaskInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutTaskInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    completed?: BoolFilter<"Activity"> | boolean
    type?: StringFilter<"Activity"> | string
    summary?: StringFilter<"Activity"> | string
    assignee?: StringFilter<"Activity"> | string
    status?: StringFilter<"Activity"> | string
    fileName?: StringNullableFilter<"Activity"> | string | null
    fileUrl?: StringNullableFilter<"Activity"> | string | null
    dueText?: StringNullableFilter<"Activity"> | string | null
    createdAt?: DateTimeFilter<"Activity"> | Date | string
    jobType?: StringNullableFilter<"Activity"> | string | null
    taskId?: StringFilter<"Activity"> | string
  }

  export type TaskCreateWithoutActivitiesInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
    column?: ColumnCreateNestedOneWithoutTasksInput
  }

  export type TaskUncheckedCreateWithoutActivitiesInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    columnId?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
  }

  export type TaskCreateOrConnectWithoutActivitiesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
  }

  export type TaskUpsertWithoutActivitiesInput = {
    update: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
    create: XOR<TaskCreateWithoutActivitiesInput, TaskUncheckedCreateWithoutActivitiesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutActivitiesInput, TaskUncheckedUpdateWithoutActivitiesInput>
  }

  export type TaskUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
    column?: ColumnUpdateOneWithoutTasksNestedInput
  }

  export type TaskUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    columnId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileCreateWithoutFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type DocFileUncheckedCreateWithoutFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type DocFileCreateOrConnectWithoutFolderInput = {
    where: DocFileWhereUniqueInput
    create: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput>
  }

  export type DocFileCreateManyFolderInputEnvelope = {
    data: DocFileCreateManyFolderInput | DocFileCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type DocFileUpsertWithWhereUniqueWithoutFolderInput = {
    where: DocFileWhereUniqueInput
    update: XOR<DocFileUpdateWithoutFolderInput, DocFileUncheckedUpdateWithoutFolderInput>
    create: XOR<DocFileCreateWithoutFolderInput, DocFileUncheckedCreateWithoutFolderInput>
  }

  export type DocFileUpdateWithWhereUniqueWithoutFolderInput = {
    where: DocFileWhereUniqueInput
    data: XOR<DocFileUpdateWithoutFolderInput, DocFileUncheckedUpdateWithoutFolderInput>
  }

  export type DocFileUpdateManyWithWhereWithoutFolderInput = {
    where: DocFileScalarWhereInput
    data: XOR<DocFileUpdateManyMutationInput, DocFileUncheckedUpdateManyWithoutFolderInput>
  }

  export type DocFileScalarWhereInput = {
    AND?: DocFileScalarWhereInput | DocFileScalarWhereInput[]
    OR?: DocFileScalarWhereInput[]
    NOT?: DocFileScalarWhereInput | DocFileScalarWhereInput[]
    id?: StringFilter<"DocFile"> | string
    name?: StringFilter<"DocFile"> | string
    size?: StringFilter<"DocFile"> | string
    fileUrl?: StringFilter<"DocFile"> | string
    uploadedBy?: StringFilter<"DocFile"> | string
    createdAt?: DateTimeFilter<"DocFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"DocFile"> | string | null
    folderId?: StringNullableFilter<"DocFile"> | string | null
  }

  export type DocFolderCreateWithoutFilesInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type DocFolderUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type DocFolderCreateOrConnectWithoutFilesInput = {
    where: DocFolderWhereUniqueInput
    create: XOR<DocFolderCreateWithoutFilesInput, DocFolderUncheckedCreateWithoutFilesInput>
  }

  export type DocFolderUpsertWithoutFilesInput = {
    update: XOR<DocFolderUpdateWithoutFilesInput, DocFolderUncheckedUpdateWithoutFilesInput>
    create: XOR<DocFolderCreateWithoutFilesInput, DocFolderUncheckedCreateWithoutFilesInput>
    where?: DocFolderWhereInput
  }

  export type DocFolderUpdateToOneWithWhereWithoutFilesInput = {
    where?: DocFolderWhereInput
    data: XOR<DocFolderUpdateWithoutFilesInput, DocFolderUncheckedUpdateWithoutFilesInput>
  }

  export type DocFolderUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocFolderUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedFileCreateWithoutFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type ProcessedFileUncheckedCreateWithoutFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type ProcessedFileCreateOrConnectWithoutFolderInput = {
    where: ProcessedFileWhereUniqueInput
    create: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput>
  }

  export type ProcessedFileCreateManyFolderInputEnvelope = {
    data: ProcessedFileCreateManyFolderInput | ProcessedFileCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type ProcessedFileUpsertWithWhereUniqueWithoutFolderInput = {
    where: ProcessedFileWhereUniqueInput
    update: XOR<ProcessedFileUpdateWithoutFolderInput, ProcessedFileUncheckedUpdateWithoutFolderInput>
    create: XOR<ProcessedFileCreateWithoutFolderInput, ProcessedFileUncheckedCreateWithoutFolderInput>
  }

  export type ProcessedFileUpdateWithWhereUniqueWithoutFolderInput = {
    where: ProcessedFileWhereUniqueInput
    data: XOR<ProcessedFileUpdateWithoutFolderInput, ProcessedFileUncheckedUpdateWithoutFolderInput>
  }

  export type ProcessedFileUpdateManyWithWhereWithoutFolderInput = {
    where: ProcessedFileScalarWhereInput
    data: XOR<ProcessedFileUpdateManyMutationInput, ProcessedFileUncheckedUpdateManyWithoutFolderInput>
  }

  export type ProcessedFileScalarWhereInput = {
    AND?: ProcessedFileScalarWhereInput | ProcessedFileScalarWhereInput[]
    OR?: ProcessedFileScalarWhereInput[]
    NOT?: ProcessedFileScalarWhereInput | ProcessedFileScalarWhereInput[]
    id?: StringFilter<"ProcessedFile"> | string
    name?: StringFilter<"ProcessedFile"> | string
    size?: StringFilter<"ProcessedFile"> | string
    fileUrl?: StringFilter<"ProcessedFile"> | string
    uploadedBy?: StringFilter<"ProcessedFile"> | string
    createdAt?: DateTimeFilter<"ProcessedFile"> | Date | string
    cloudinaryPublicId?: StringNullableFilter<"ProcessedFile"> | string | null
    folderId?: StringNullableFilter<"ProcessedFile"> | string | null
  }

  export type ProcessedFolderCreateWithoutFilesInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type ProcessedFolderUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    parentId?: string | null
    createdAt?: Date | string
  }

  export type ProcessedFolderCreateOrConnectWithoutFilesInput = {
    where: ProcessedFolderWhereUniqueInput
    create: XOR<ProcessedFolderCreateWithoutFilesInput, ProcessedFolderUncheckedCreateWithoutFilesInput>
  }

  export type ProcessedFolderUpsertWithoutFilesInput = {
    update: XOR<ProcessedFolderUpdateWithoutFilesInput, ProcessedFolderUncheckedUpdateWithoutFilesInput>
    create: XOR<ProcessedFolderCreateWithoutFilesInput, ProcessedFolderUncheckedCreateWithoutFilesInput>
    where?: ProcessedFolderWhereInput
  }

  export type ProcessedFolderUpdateToOneWithWhereWithoutFilesInput = {
    where?: ProcessedFolderWhereInput
    data: XOR<ProcessedFolderUpdateWithoutFilesInput, ProcessedFolderUncheckedUpdateWithoutFilesInput>
  }

  export type ProcessedFolderUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedFolderUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TaskCreateManyColumnInput = {
    id: string
    content: string
    price: string
    phone: string
    email?: string | null
    description?: string | null
    source?: string | null
    assignedTo: string
    visaType?: string | null
    passportNumber?: string | null
    maritalStatus?: string | null
    dependents?: number | null
    priorityDate?: string | null
    educationLevel?: string | null
    englishScore?: string | null
    workExperience?: string | null
    jobType?: string | null
    checklistType?: string | null
    createdAt?: Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: string
    commissionPaid?: boolean
    recruitmentStep?: string | null
  }

  export type TaskUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
    activities?: ActivityUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutColumnInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableStringFieldUpdateOperationsInput | string | null
    assignedTo?: StringFieldUpdateOperationsInput | string
    visaType?: NullableStringFieldUpdateOperationsInput | string | null
    passportNumber?: NullableStringFieldUpdateOperationsInput | string | null
    maritalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    dependents?: NullableIntFieldUpdateOperationsInput | number | null
    priorityDate?: NullableStringFieldUpdateOperationsInput | string | null
    educationLevel?: NullableStringFieldUpdateOperationsInput | string | null
    englishScore?: NullableStringFieldUpdateOperationsInput | string | null
    workExperience?: NullableStringFieldUpdateOperationsInput | string | null
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
    checklistType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: NullableJsonNullValueInput | InputJsonValue
    processingColId?: StringFieldUpdateOperationsInput | string
    commissionPaid?: BoolFieldUpdateOperationsInput | boolean
    recruitmentStep?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityCreateManyTaskInput = {
    id: string
    completed?: boolean
    type: string
    summary: string
    assignee: string
    status: string
    fileName?: string | null
    fileUrl?: string | null
    dueText?: string | null
    createdAt?: Date | string
    jobType?: string | null
  }

  export type ActivityUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActivityUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    type?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    assignee?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    dueText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jobType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileCreateManyFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type DocFileUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DocFileUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFileCreateManyFolderInput = {
    id?: string
    name: string
    size: string
    fileUrl: string
    uploadedBy: string
    createdAt?: Date | string
    cloudinaryPublicId?: string | null
  }

  export type ProcessedFileUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFileUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProcessedFileUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    size?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    uploadedBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cloudinaryPublicId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}