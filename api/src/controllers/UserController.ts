import { Request, Response, ErrorRequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import UserModel from '../schemas/User'

class UserController {

  public async index(res: Response, err: ErrorRequestHandler): Promise<Response> {

    const users = await UserModel.find()

    if (err) {
      res.json({
        status: "error",
        message: err
      });
    }

    return res.json({
      status: "success",
      message: "Users retrieved successfully",
      data: users
    })
  }

  public async store(req: Request, res: Response, err: ErrorRequestHandler ): Promise<Response> {

    const users = await UserModel.find({ username: req.body.username.trim(), email: req.body.email })

    console.log(users);
    if (err) {
      return res.json({
        status: "error",
        message: err
      })
    }

    if (users && users.length > 0) {
      return res.status(400).send({
        status: "error",
        message: req.body.username + " is already taken"
      })
    } else if (email) {

    }

    const usertoCreate = new UserModel()
    usertoCreate.username = req.body.username ? req.body.username : usertoCreate.username;
    if (req.body.password) {
      usertoCreate.password = bcrypt.hashSync(req.body.password, 10);
    }

    usertoCreate.firstName = req.body.firstName
    usertoCreate.lastName = req.body.lastName
    usertoCreate.fullLegalName()
    usertoCreate.mobile = req.body.mobile
    usertoCreate.citizenship = req.body.citizenship
    usertoCreate.email = req.body.email
    usertoCreate.skype = req.body.skype

    // save the user and check for errors
    usertoCreate.save((err) => {
      err ? res.json(err) : res.json({ data: usertoCreate })
    })

    return res.json({
      message: "New user succefully created!",
      data: usertoCreate
    })

  }

  public async view(req: Request, res: Response, err: ErrorRequestHandler ): Promise<Response>  {
    const userRequested = UserModel.findById(req.params.user_id)

    if (err) res.send(err)

    return res.json({
      message: "User details loading..",
      data: userRequested
    })

  }

  public async update(res: Response, req: Request, err: ErrorRequestHandler): Promise<Response> {

    const userToUpdate = UserModel.findByIdAndUpdate(req.params.user_id, req.body, { new: true })
    if (err) res.send(err)

    return res.json({
      message: "User Info updated",
      data: userToUpdate
    })

  }

  /**
   * delete
   */
  public async delete(res: Response, req: Request, err:? ErrorRequestHandler): Promise<Response> {
    const userToDelete
  }
}

export default new UserController()
