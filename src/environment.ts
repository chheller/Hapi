const env = process.env['NODE_ENV'];

export interface Environment {
  app: {
    host: string;
    port: number;
    protocol: 'http' | 'https';
  };
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

const dev: Environment = {
  app: {
    host: 'localhost',
    port: 8080,
    protocol: 'http'
  },
  db: {
    host: 'localhost',
    port: 27017,
    username: 'dbuserdev',
    password: 'dbpass$dev'
  }
};

const prod: Environment = {
  app: {
    host: 'localhost',
    port: 42402,
    protocol: 'http'
  },
  db: {
    host: 'localhost',
    port: 27017,
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD']
  }
};

export default <Environment>{ dev, prod }[env] || dev;
