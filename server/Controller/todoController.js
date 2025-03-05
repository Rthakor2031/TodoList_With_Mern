const Todo = require("../model/Todo");

const Create_Todo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({ message: "All fields are required..." });
    }

    const createTodo = new Todo({title , description});
    await createTodo.save()
    return res.status(200).json({message:"Todo Created Successfully..."})

  } catch (error) {
    console.log(error)
  }
};

const GetAll_Todo = async (req , res) => {
    try {
        const GetAlltodos = await Todo.find();
        if (GetAlltodos.length === 0) {
            return res.status(404).json({ message:"No todos found"});
        }
        return res.status(200).json(GetAlltodos);

    } catch (error) {
        console.log(error);
    }
}

// const Update_Todo = async (req , res) => {
//     try {
//         const {}
//     } catch (error) {
//         console.log(error)
//     }
// }

const Update_Todo = async (req , res) => {
  try {
      const {todoId} = req.params;
      const {title , description} = req.body;
      if(!todoId){
          return res.status(400).json({message:"Invalid Id todoId"})
      }
      const updateTodo = await Todo.findByIdAndUpdate(todoId , {title , description} , {new:true})

      if (!updateTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json({ message: "Todo updated successfully", updateTodo });

  } catch (error) {
    console.log(error)
  }
}

  const Delete_Todo = async (req , res) => {
    try {
      const {todoId} = req.params;
      if(!todoId){
        return res.status(400).json({ message: "Invalid ID provided" });
      }

      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo deleted successfully" });

    } catch (error) {
      console.log(error)
    }
  }

module.exports = {Create_Todo , GetAll_Todo , Update_Todo , Delete_Todo}
