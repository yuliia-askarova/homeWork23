class Recipe {
    constructor (name, ingredientsList, description, time){
        this.name = name;
        this.ingredientsList = ingredientsList;
        this.description = description;
        this.time = time; 
    }

    showInConsole (){
        console.log(this.name, this.ingredientsList, this.description, this.time);
    }

    isValid (){
        if(this.name && Array.isArray(this.ingredientsList) && this.ingredientsList.length && this.description && this.time > 0){
            return true
        } else {
            return false
        }
    }

}

class RecipeBook {
    constructor (){
        this.recipes = [];
    }

    addRecipe (recipe){
        if(recipe instanceof Recipe && recipe.isValid()){
            this.recipes.push(recipe)
        }
    }

    checkTime (time){
        const filtered = this.recipes.filter(recipe => recipe.time <= time);
        return this.transformData(filtered)
    }

    checkIngredients (ingredients){
        const filtered = this.recipes.filter(recipe => {
            let flag = true;
            ingredients.forEach(element => {
                let temp = recipe.ingredientsList.includes(element);
                if(!temp){
                    flag = false
                }
            });
            return flag

        })
    return this.transformData(filtered)
    }

    transformData (data){
        const maped = data.map(({name}) => name);
        const str = maped.reduce((acc, current) => {
            acc += `${current}, `
            return acc
        }, '')
        return str.slice(0, -2)
   }

}

const olivie = new Recipe ('Оливье', 
['картошка', 'морковка', 'лук', 'яйца', 'колбаса', 'огурцы', 'майонез'], 
'сварить картошку и морковку, нарезать все ингредиенты кубиками, перемешать, залить майонезом',
120
);

const pasta = new Recipe ( 'Макароны с сыром',
['макароны', 'сыр', 'масло', 'молоко', 'морковка'], 
'сварить макароны, добавить масло, сыр и молоко, поставить в духовку на 5 минут чтобы растопить сыр',
30
);

const meatBalls = new Recipe ('котлеты',
['фарш', 'лук', 'яйцо', 'соль', 'перец', 'картошка'],
'Нарезать лук, в фарш добавить все ингредиенты, перемешать, жарить на сковороде до готовности',
60
)

const sushi = new Recipe ('суши',
['рис', 'нори', 'лосось', 'авокадо', 'филадельфия'],
'Посмотрите в интернете',
60
)

const invalid = new Recipe ('', [], '', 0)

const recipeBook = new RecipeBook ();

recipeBook.addRecipe(olivie);
recipeBook.addRecipe(pasta);
recipeBook.addRecipe(meatBalls);
console.log(recipeBook.recipes);

olivie.showInConsole()
console.log(olivie.isValid());

console.log(recipeBook.checkTime(60));
console.log(recipeBook.checkIngredients(['картошка', 'морковка']));