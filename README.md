# Table Reservation System
This application was generated using JHipster 5.0.0, you can find documentation of JHipster and help at [https://www.jhipster.tech/documentation-archive/v5.0.0](https://www.jhipster.tech/documentation-archive/v5.0.0).

## Uses & Functionalities
In the Table reservation system customer can book the table from given hotel, which is added by admin.
  1. Admin has faclities to add the hotels and related informations, such as staff details, table details, cuisines and time slot of the each hotel.
  2. Admin can manage the rush and normal hours of the each hotel. This system has auto relese functionality to relese the table, after the time slot is completed then it will relese the table and table will be available for the booking to other customers.
  3. Customer can register in the Table resrvation system and they can reserve the hotel table using this application.
  4. For reserving the hotel, customer can search the hotel and book the table according to the available tables.
  
  
 ## How to install?
  1. Clone the repository: https://github.com/bhavesh-sarvaiya/table-reservation-system
  
  2. Database:
      - This system is developed using PostgreSql database.
      - So before installing this application in your machine, you must install the PostgreSql database on your machine https://www.postgresql.org/download/
      - Create blank database in postgresql and add datasource at `src->main->resources->config->application-dev.yml` at line no. near 33.
      - Database configure in `pom.xml` file at line no. near 523.
      
  3. Before you can build this project, you must install and configure the following dependencies on your machine:

    - [Node.js][]: We use Node to run a development web server and build the project.
       Depending on your system, you can install Node either from source or as a pre-packaged bundle.
    - [Yarn][]: We use Yarn to manage Node dependencies.
       Depending on your system, you can install Yarn either from source or as a pre-packaged bundle.

 4. After installing Node, you should be able to run the following command to install development tools.
    You will only need to run this command when dependencies change in [package.json](package.json).

        yarn install

 5. Run the following commands in two separate terminals from the root directory to create a blissful development experience where your      browser auto-refreshes when files change on your hard drive.

        ./mvnw
        yarn start
 Note: Application is running on https://localhost:8080, So please make sure 8080 port should be free.

[Yarn][] is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `yarn update` and `yarn install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `yarn help update`.

The `yarn run` command will list all of the scripts available to run for this project.


### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts


## Building for production

To optimize the TableReservation application for production, run:

    ./mvnw -Pprod clean package

This will concatenate and minify the client CSS and JavaScript files. It will also modify `index.html` so it references these new files.
To ensure everything worked, run:

    java -jar target/*.war

Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

### Client tests

Unit tests are run by [Jest][] and written with [Jasmine][]. They're located in [src/test/javascript/](src/test/javascript/) and can be run with:

    yarn test

UI end-to-end tests are powered by [Protractor][], which is built on top of WebDriverJS. They're located in [src/test/javascript/e2e](src/test/javascript/e2e)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`yarn run e2e`) in a second one.

For more information, refer to the [Running tests page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

    docker-compose -f src/main/docker/postgresql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/postgresql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw verify -Pprod dockerfile:build dockerfile:tag@version dockerfile:tag@commit

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 5.0.0 archive]: https://www.jhipster.tech/documentation-archive/v5.0.0

[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v5.0.0/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v5.0.0/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v5.0.0/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v5.0.0/running-tests/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v5.0.0/setting-up-ci/


[Node.js]: https://nodejs.org/
[Yarn]: https://yarnpkg.org/
[Webpack]: https://webpack.github.io/
[Angular CLI]: https://cli.angular.io/
[BrowserSync]: http://www.browsersync.io/
[Jest]: https://facebook.github.io/jest/
[Jasmine]: http://jasmine.github.io/2.0/introduction.html
[Protractor]: https://angular.github.io/protractor/
[Leaflet]: http://leafletjs.com/
[DefinitelyTyped]: http://definitelytyped.org/



## Liquibase
  ### Generate changeset
    - mvnw liquibase:diff
      	
 ### clearCheckSums
    - liquibase:clearCheckSums
