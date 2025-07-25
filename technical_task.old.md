this is th technical task for an AI.

this project is a simple static page generator for various events and conferences.
the app consists of two parts

- admin panel
- the page(s)

As an admin i can login to the dashboard and there will be ui for managing conferences, users of the admin panel and guests who registered to participate.
A conference can be created and assigned to any url including root of the app except those reserved for admin dashboard.
A conference has a list of own properties and related properties.
Own properties mean date or dates of performance, title, description, etc.
There must be ui to manage the conference page contents. It must be a constructor that builds page vertically block by block.
There can be various typical blocks that one would expect to see on such websites as well as custom html/css one.
THe list of block types: hero, map, form, credits, owners, speakers, countdown, custom.
Each block type should have appropriate fields that they should logically have, such as title and description for hero, address form map, list of persons for owners.
Each block should have its own typical settings such as background padding margin, etc.

hero is a main block with title and description and button that will scroll the user to the regisreation form.
map is both date time and embedded 2gis widget. date time can be single or multiple dates.
form is a guest registrtion form. admin should be able to configure what fields they need from users. fields types must be present for selection in a good variety.
For example - typical field for such event - phone number. that means the admin just sees some indication that there will be a phone input number, but a guest will see a proper input with autocomplete and country code selecotor. for guest's address there must be for admin - the same - just indication of input type, for guest - a proper countries selector with search. Extrapolate that logic to every field type. Also radio, checkbox or any other type of typical web input also must be an option.

if a conference will take place at the multiple dates the countdown should only display the time left before the firs date. After that countdown block should be hidden.

When admin fills all the nessesary fields and saves the form the newly created conference page should be instantly available by the provided url.
The page will consist of blocks that were configured by the admin.

When admin opens the form for a conference creation the form must be already filled with some default data, typical page of a conference in the doodoo dynamic co ltd.
That data must include background images. That means we need a way for static default images to be located among the source code and be automatically deployed with the app.

As admin i see the guests ui /admin/guests. It should be a standart crud table ui with virtual scrolling. The guest creation ui is basically the same form the guest sees on the page.
There must be an option to add or remove a column for a guest data. This action must be tied to form fields. Basically a guest fields that admin set as required or optional for them will reflect what form fields admin see at the /admin/guests new guest form, and what fields a guest see on the page. A change in the guests list should affect the form constructor, and change in the form constructor for any field should affect the guest table. There also must be export option that would export the whole guests table as xlsx or csv.

As admin i can manage the admin panel users ui /admin/users. It should be a standart crud table ui with virtual scrolling.

As a guest i can fill the form, click submit, and i will see confirmation message. All my data is saved.

There already is something done. Analyze both frontend and backend, understand what there is and what has to be changed.

For frontend we use react and mantine ui, so use mantine components and hooks, you can make you own component if there is no good solution in mantine.
use mantine built-in properties such as p={} maw={} etc before making .module.css
Do not do the tests.
if you change something in the backend in terms of public api you have to regenerate the client on the frontend with command generate:client
Follow feature sliced design patterns. Split the code. Large file are not wellcome.
Ignore any code style liners errors.
If you change prisma shema then run prisma:migrate and name the migration when the cli asks.
